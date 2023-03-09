//Module to store and handle social post data model

//data structure to store posts
const posts=[]
let nextPostID=0

function addNewPost(user, message){
    let fullPost={
        postID: nextPostID++,
        user: user,
        message: message,
        likes: 0,
        likedBy: [],
        time: Date.now()
    }
    //console.log(fullPost)
    posts.unshift(fullPost)
}


function retrievePosts(numberToRetrieve){
    return posts.slice(0,numberToRetrieve)
}

function findByID(suppliedPostID){
    return posts.find(post=>
        post.postID==suppliedPostID
    )
}

function likePost(postID,likedbyUser){
    let matchingPost=findByID(postID);
    console.log(matchingPost)
    if(matchingPost){
        matchingPost.likes++
        let likedByThisUser=matchingPost.likedBy.find(lb=>{
            lb==likedbyUser
        })
        if(!likedByThisUser){
            matchingPost.likedBy.push(likedbyUser)
        }
    }
    console.log(matchingPost)
    return true
}


module.exports={addNewPost, retrievePosts, likePost, findByID}
