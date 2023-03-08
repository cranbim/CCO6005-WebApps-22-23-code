//Module to store and handle social post data model

//data structure to store posts
const posts=[]
let nextPostID=0

function addNewPost(user, message){
    let fullPost={
        postID: nextPostID++,
        user: user,
        message: message,
        time: Date.now()
    }
    //console.log(fullPost)
    posts.unshift(fullPost)
}

function retrievePosts(numberToRetrieve){
    return posts.slice(0,numberToRetrieve)
}

module.exports={addNewPost, retrievePosts}
