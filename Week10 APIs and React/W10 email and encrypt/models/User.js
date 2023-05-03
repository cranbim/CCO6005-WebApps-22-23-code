
    // const users=[
    //     {username:'user1', password:'123', loggedin:false},
    //     {username:'user2', password:'123', loggedin:false}
    // ]

const mongoose=require('mongoose');
const { Schema, model } = mongoose;

//import bcrypt
const bcrypt=require('bcrypt')
const SALT_WORK_FACTOR = 10

const userSchema = new Schema({
    username: String,
    password: String,
    loggedin: Boolean
});

//create salt and hash when a password is changed
userSchema.pre('save', function(next) {
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});



const User = model('User', userSchema);


    async function newUser(username, password){
        const user={username:username, password:password, loggedin:false}
        // users.push(user)
        await User.create(user)
        .catch(err=>{
            console.log('Error:'+err)
        });
    }

    // function getUsers(){
    //     return users
    // }

    async function getUsers(){
        let data=[];
        await User.find({})
            .exec()
            .then(mongoData=>{
                data=mongoData;
            })
            .catch(err=>{
                console.log('Error:'+err)
            });
        return data;
    }

    // function findUser(username){
    //     return users.find(user=>user.username==username)
    // }

    async function findUser(userToFind){
        let user=null
        await User.findOne({username:userToFind}).exec()
            .then(mongoData=>{
                user=mongoData;
            })
            .catch(err=>{
                console.log('Error:'+err)
            });
        return user;
    }

    // previous checkPassword without encryption
    // async function checkPassword(username, password){
    //     let user=await findUser(username)
    //     if(user){
    //         return user.password==password
    //     }
    //     return false
    // }

    //bcrypt version, passing in an action function
    async function checkPassword(username, password, action){
        let user=await findUser(username)
        bcrypt.compare(password, user.password)
                .then(isMatch => {
                    action(isMatch)
                })
                .catch(err => {
                    throw err
                })
    }

    async function setLoggedIn(username, state){
        let user=await findUser(username)
        if(user){
            user.loggedin=state
            user.save()
        }
    }

    async function isLoggedIn(username){
        let user=await findUser(username)
        if(user){
            return user.loggedin=state
        }
        return false
    }

exports.newUser=newUser;
exports.getUsers=getUsers;
exports.findUser=findUser;
exports.checkPassword=checkPassword;
exports.setLoggedIn=setLoggedIn;
exports.isLoggedIn=isLoggedIn;

