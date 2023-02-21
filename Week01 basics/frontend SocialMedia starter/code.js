console.log("Simple Posting App")

const userID=1
let nextPostId=0
let recentPosts=[]

let postWords=document.getElementById('words')
let postButton=document.querySelector('#post-button')
let recentPostsList=document.querySelector('#recent-posts')

postWords.addEventListener('keypress', processKeys)
postWords.addEventListener('input', postDidChange)
postButton.addEventListener('click', processPostButton)

function processKeys(event){
    if(event.key === "Enter" || event.which===13){
        createPost(event.target.value)
        event.preventDefault()
    }
}

function processPostButton(event){
    createPost(postWords.value)
}

function postDidChange(event){
    console.log(event.target.value)
}

function createPost(postText){
    let post={
        content: postText,
        postId: nextPostId++,
        timePosted: Date.now(),
        user: userID
    }
    postWords.value=''
    console.log(post)
    recentPosts.unshift(post)
    updatePostsList()
}

function updatePostsList(){
    recentPostsList.textContent=''
    recentPosts.forEach(function(post,i){
        let postLi=document.createElement('li')
        postLi.textContent=`${post.content} by user ${post.user} post id=${post.postId}`
        recentPostsList.appendChild(postLi)
    })
}