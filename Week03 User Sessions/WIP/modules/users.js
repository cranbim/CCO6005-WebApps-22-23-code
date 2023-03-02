
    const users=[]

    function newUser(username, password){
        const user={username:username, password:password}
        users.push(user)
    }

    function getUsers(){
        return users
    }

    function findUser(username){
        return users.find(user=>user.username==username)
    }

exports.newUser=newUser;
exports.getUsers=getUsers;
exports.findUser=findUser;

