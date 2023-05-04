require('dotenv').config();
const mongoDBPassword=process.env.MYMONGODBPASSWORD
const sessionSecret=process.env.MYSESSIONSECRET
const sendgridAPIKey=process.env.SENDGRID_API_KEY


const express=require('express')
const app = express()
app.listen(3000, ()=> console.log('listening at port 3000'))

//serve unspecified static pages from our public dir
app.use(express.static('public'))
//make express middleware for json available
app.use(express.json())

//allows us to process post info in urls
app.use(express.urlencoded({extended: false}));

const path = require('path');

//multer allows processing multipart forms with images
const multer=require('multer');

const upload = multer({ dest: './public/uploads/' })

//import sendgrid and set API key from .env secrets
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(sendgridAPIKey)


//consts to hold expiry times in ms
const threeMins = 1000 * 60 * 3;
const oneHour = 1000 * 60 * 60;

//use the sessions module and the cookie parser module
const sessions = require('express-session');
const cookieParser = require("cookie-parser");

//make cookie parser middleware available
app.use(cookieParser());

//load sessions middleware, with some config
app.use(sessions({
    secret: sessionSecret,
    saveUninitialized:true,
    cookie: { maxAge: oneHour },
    resave: false 
}));

// set the view engine to ejs
app.set('view engine', 'ejs');

//load mongoose module and connect to MongoDB instance and database
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://CCO6005-00:${mongoDBPassword}@cluster0.lpfnqqx.mongodb.net/DavesApp?retryWrites=true&w=majority`)

//importing our own node module
const users=require('./models/User')

//load our Post model
const postData =require('./models/Post');

//test that user is logged in with a valid session
function checkLoggedIn(request, response, nextAction){
    if(request.session){
        if(request.session.userid){
            nextAction()
        } else {
            request.session.destroy()
            return response.redirect('/notloggedin.html')
        }
    }
}

//test route to demonstrate email
app.get('/testemail', (request, response)=>{
    const msg = {
        to: 'd.webb@bathspa.ac.uk', // Change to your recipient
        from: 'dave.webb@cranbim.com', // Change to your verified sender
        subject: 'WebApps is hard but useful',
        text: 'You are doing great. Keep going!',
        html: '<strong>Nearly at the end!</strong>',
      }
      console.log('sending test email')
      sgMail
        .send(msg)
        .then((response) => {
          console.log(response[0].statusCode)
          console.log(response[0].headers)
        })
        .catch((error) => {
          console.error(error)
        })
    response.sendFile(path.resolve(__dirname,'views/pages/emailresult.html'))
})

//controller for the main app view, depends on user logged in state
app.get('/app', checkLoggedIn, (request, response)=>{
    // response.redirect('./viewposts.html')
    // response.render('pages/viewposts');
    response.sendFile(path.resolve(__dirname,'views/pages/viewposts.html'))
})


//controller for logout
app.post('/logout', async (request, response)=>{
    
    await users.setLoggedIn(request.session.userid,false)
    request.session.destroy()
    await console.log(users.getUsers())
    response.redirect('./loggedout.html')
})

//controller for login
app.post('/login', async (request, response)=>{
    console.log(request.body)
    let userData=request.body
    console.log(userData)
    
    if(await users.findUser(userData.username)){
        console.log('user found')
        //with bcrypt we need to pass code as a callback
        await users.checkPassword(userData.username, userData.password, async function(isMatch){
            if(isMatch){
                console.log('password matches')
                request.session.userid=userData.username
                await users.setLoggedIn(userData.username, true)
                response.redirect('/app')
            } else {
                console.log('password wrong')
                response.redirect('/loginfailed.html')
            }
        })
        // Before using bcrypt we got a boolena from checkPassword
        // if(await users.checkPassword(userData.username, userData.password)){
        //     console.log('password matches')
        //     request.session.userid=userData.username
        //     await users.setLoggedIn(userData.username, true)
        //     response.redirect('/app')
        // } else {
        //     console.log('password wrong')
        //     response.redirect('/loginfailed.html')
        // }
    } else {
        console.log('no such user')
        response.redirect('/loginfailed.html')
    }
})

app.get('/newpostpage', checkLoggedIn, (request, response)=>{
    // response.redirect('./application.html')
    // response.redirect('./viewposts.html')
    response.render('pages/newpost');
})

app.post('/newpost', upload.single('myImage'), async (request, response) =>{
    console.log(request.body)
    let filename=null
    if(request.file && request.file.filename){ //check that a file was passes with a valid name
        filename='uploads/'+request.file.filename
    }
    await postData.addNewPost(request.session.userid, request.body, filename)
    response.redirect('/viewposts.html')
})




// async/await version of /getposts controller using Mongo
app.get('/getposts',async (request, response)=>{
    response.json(
        {posts:await postData.getPosts(5)}
    )
})


//controller for handling a post being liked
app.post('/like', async (request, response)=>{
    //function to deal with a like button being pressed on a post
    likedPostID=request.body.likedPostID
    likedByUser=request.session.userid
    await postData.likePost(likedPostID, likedByUser)
    // console.log(likedByUser+" liked "+likedPostID)
    response.json(
        {posts:await postData.getPosts(5)}
    )
})

app.post('/comment', async (request, response)=>{
    //function to deal with a like button being pressed on a post
    let commentedPostID=request.body.postid
    let comment=request.body.message
    let commentByUser=request.session.userid
    await postData.commentOnPost(commentedPostID, commentByUser, comment)
    // response.json({post: await postData.getPost(commentedPostID)})
    response.redirect('/viewposts.html')
})

app.post('/getonepost', async (request, response) =>{
    // console.log(request.file)
    let postid=request.body.post
    console.log(request.body)
    response.json({post: await postData.getPost(request.body.post)})
})

//controller for registering a new user
app.post('/register', async (request, response)=>{
    console.log(request.body)
    let userData=request.body
    // console.log(userData.username)
    if(await users.findUser(userData.username)){
        console.log('user exists')
        response.json({
            status: 'failed',
            error:'user exists'
        })
    } else {
        users.newUser(userData.username, userData.password)
        response.redirect('/registered.html')
    }
    console.log(users.getUsers())
})
