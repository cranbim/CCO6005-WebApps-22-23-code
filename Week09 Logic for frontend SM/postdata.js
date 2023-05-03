const wordSource="Even the daily papers woke up to the disturbances at last, and popular notes appeared here, there, and everywhere concerning the volcanoes upon Mars. The seriocomic periodical Punch, I remember, made a happy use of it in the political cartoon. And, all unsuspected, those missiles the Martians had fired at us drew earthward, rushing now at a pace of many miles a second through the empty gulf of space, hour by hour and day by day, nearer and nearer. It seems to me now almost incredibly wonderful that, with that swift fate hanging over us, men could go about their petty concerns as they did. I remember how jubilant Markham was at securing a new photograph of the planet for the illustrated paper he edited in those days. People in these latter times scarcely realise the abundance and enterprise of our nineteenth-century papers. For my own part, I was much occupied in learning to ride the bicycle, and busy upon a series of papers discussing the probable developments of moral ideas as civilisation progressed."
const wordPool=wordSource.split(" ")

let posts=[]


let users=[
    {
        userID: "0001",
        userName: "davewebb",
        password: "456",
        profilePic: "somePathToAPic",
        bio: "I am living my best life. In Roblox!",
        followsUsers: [
            "0002","0004"
        ],
        // followedByUsers: [
        //     "0002","0005"
        // ]
    },
    {
        userID: "0002",
        userName: "spongebob",
        password: "123",
        profilePic: "somePathToAPic",
        bio: "I live in a pineapple, under the sea",
        followsUsers: [
            "0001","0003"
        ],
        // followedByUsers: [
        //     "0001","0003"
        // ]
    },{
        userID: "0003",
        userName: "patrick",
        password: "321",
        profilePic: "somePathToAPic",
        bio: "Spongebob is my best friend",
        followsUsers: [
            "0002","0001"
        ],
        // followedByUsers: [
        //     "0001","0003"
        // ]
    }
]

generatePosts(13)
console.log(posts)

function generatePosts(n){
    for(let i=0; i<n; i++){
        let post={
            message: getWords(10),
            postedBy: users[Math.floor(Math.random()*users.length)].userID,
            likedBy: []
        }
        let followers=[]
        users.forEach(function(user){
            if(user.followsUsers.findIndex(fu=>fu==post.postedBy)>-1){
                followers.push(user.userID)
            }
        })
        console.log(post.postedBy, followers)
        let numLikes=Math.floor(Math.random()*3)
        for(let i=0; i<numLikes; i++){
            post.likedBy.push(followers[Math.floor(Math.random()*followers.length)])
        }
        posts.push(post)
    }
}

function getWords(n){
    let message=[]
    for(let i=0; i<n; i++){
        message.push(wordPool[Math.floor(Math.random()*wordPool.length)])
    }
    return message.join(" ")
}

function getPostsByThoseIFollow(me){
    let filteredPosts=[]
    let retrievedUser=users[me]
    let thoseIFollow=retrievedUser.followsUsers
    console.log(retrievedUser.userID,"follows",thoseIFollow)
    posts.forEach(function(post){
        thoseIFollow.forEach(function(fu){
            if(post.postedBy==fu){
                filteredPosts.push(post)
            }
        })
    })
    return filteredPosts


module.exports={users,posts,getPostsByThoseIFollow}