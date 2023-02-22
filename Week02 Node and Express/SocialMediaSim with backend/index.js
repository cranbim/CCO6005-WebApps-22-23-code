const express=require('express')
const app = express()
app.listen(3000, ()=> console.log('listening at port 3000'))
app.use(express.static('public'))
app.use(express.json())
const path = require('path');

const postList=[]
let nextPostID=0
defaultQtyPostsToSend=3

app.post('/newpost', (request, response)=>{
    console.log(request.body)
    let post=request.body
    post.postID=nextPostID++
    postList.unshift(post)
    response.json({
        posts:postList.slice(0,defaultQtyPostsToSend)
    })
    
})

app.get('/getposts', (request, response)=>{
    // console.log(request.body)
    const qtyPosts = request.query.qty;
    console.log('send me '+qtyPosts+' posts please')
    response.json({
        posts:postList.slice(0,qtyPosts)
    })
})

