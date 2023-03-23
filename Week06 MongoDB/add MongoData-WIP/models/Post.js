const mongoose=require('mongoose');
const { Schema, model } = mongoose;

const postSchema = new Schema({
    postedBy: String,
    message: String,
    likes: Number,
    time: Date,
    tags: [String],
    comments: [{
        user: String,
        message: String,
        likes: Number
    }]
});

const Post = model('Post', postSchema);


function addNewPost(userID, post){
    let myPost={
        postedBy: userID,
        message: post.message,
        likes: 0,
        time: Date.now()
    }
    Post.create(myPost)
        .catch(err=>{
            console.log('Error:'+err)
        });
}


//needs to be an async function so we can pause execution awaiting for data
async function getPosts(n=3){
    let data=[];
    await Post.find({})
        .sort({'time': -1})
        .limit(n)
        .exec()
        .then(mongoData=>{
            data=mongoData;
        })
        .catch(err=>{
            console.log('Error:'+err)
        });
    return data;
}

async function likePost(likedPostID, likedByUser){
    // await Post.findByIdAndUpdate(likedPostID,{$inc: { likes: 1 }})
    let found
    await Post.findByIdAndUpdate(likedPostID,{$inc: {likes: 1}}).exec()
        .then(foundData=>found=foundData)
    // console.log(found)
}

// module.exports = Post;
module.exports = {addNewPost, getPosts, likePost};