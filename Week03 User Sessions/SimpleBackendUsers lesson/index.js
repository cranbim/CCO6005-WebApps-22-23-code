const express=require('express')
const app = express()
app.listen(3000, ()=> console.log('listening at port 3000'))

//serve unspecified static pages from our public dir
app.use(express.static('public'))
//make express middleware for json available
app.use(express.json())

app.use(express.urlencoded({extended: false}))

//importing our own node module
const users=require('./users.js')

const sessions=require('express-session')

const oneHour= 1000 * 60 * 60

app.use(sessions({
    secret: "this is a secret key",
    saveUninitialized: true,
    cookie: {maxAge: oneHour},
    resave: false
}))

const cookieParser=require('cookie-parser')
app.use(cookieParser())



//test that user is logged in with a valid session
function checkLoggedIn(request, response, nextAction){
    if(true){
        nextAction()
    }
}

//controller for the main app view, depends on user logged in state
app.get('/app', checkLoggedIn, (request, response)=>{
    if(request.session.username){
        response.redirect('./application.html')
    } else {
        response.redirect('./notloggedin.html')
    }
    
})


//controller for logout
app.post('/logout', (request, response)=>{
    request.session.destroy()
    response.redirect('./loggedout.html')
})

//controller for login
app.post('/login', (request, response)=>{
    let userData=request.body
    if(users.findUser(userData.username)){
        console.log('found the user')
        if(users.checkPassword(userData.username, userData.password)){
            request.session.username=userData.username
            response.redirect('/loggedin.html')
        } else {
            response.redirect('/notloggedin.html')
        }
    } else {
        response.redirect('/notloggedin.html')
    }
    
})


//controller for registering a new user
app.post('/register', (request, response)=>{
    console.log(users.getUsers())
    response.redirect('/registered.html')
})