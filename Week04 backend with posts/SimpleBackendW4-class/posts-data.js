
const posts=[]

function addNewPost(userID, message){
    let myPost={
        postedBy: userID,
        message: message,
        likes: 0,
        time: Date.now()
    }
    posts.unshift(myPost)
}

module.exports={addNewPost}
