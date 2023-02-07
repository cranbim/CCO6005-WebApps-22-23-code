console.log("Simple Posting App")
const queryString = window.location.search;
// console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const userParam = urlParams.get('user')
const user={
    userID: userParam,
    someOtherStuff: null
}
console.log(user);

let words=document.querySelector('#words')
words.addEventListener('input',checkWords)
words.addEventListener('keypress',checkIfReturn)

let postButton=document.querySelector('#postwords')
postButton.addEventListener('click',postWords)

let maxWords=5
let currentWords=[]

let recentPosts=[]
let nextPostID=0
let maxRecents=3
let warningSpan=document.querySelector('#warning')
let warningMessage="only 5 words allowed"


function checkIfReturn(event){
    if(event.key === "Enter" || event.which===13){
        postWords()
        event.preventDefault();
    }
}


function checkWords(event){
    currentWords=[]
    let wordsNow=[]
    let inputText=event.target.value
    let inputWords=inputText.split(' ')
    if(inputWords.length>maxWords){
        warningSpan.textContent=warningMessage
        console.log("too many words: maximum 5!")
        wordsNow=inputWords.slice(0,5)
        // console.log(wordsNow)
        words.value=wordsNow.join(' ')
    } else {
        warningSpan.textContent=""
        wordsNow=[...inputWords]
    }
    console.log(wordsNow)
    currentWords=wordsNow
}

function postWords(){
    if(currentWords.length==0){
        console.log('no words to post')
    } else {
        let myPost={
            postID: nextPostID++,
            userID: user.userID,
            post: [...currentWords],
            likes: 0,
            time: Date.now()
        }
        // console.log(myPost)
        postTheseWords(myPost)
        recentPosts.unshift(myPost)
        if(recentPosts.length>maxRecents){
            recentPosts.pop()
        }
        clearWordInput()
        updateRecentPosts()
    }
}

function clearWordInput(){
    words.value=''
    currentWords=[]
}

function postTheseWords(wordsToPost){
    console.log("posting...")
    console.log(wordsToPost)
    console.log("... Posted!")
}

let recentPostList=document.querySelector("#recent-posts")

function updateRecentPosts(){
    recentPostList.innerHTML=''
    recentPosts.forEach(function(post){
        let li=document.createElement('li')
        let now=Date.now()
        let ellapsed=new Date(now-post.time)
        let ellapsedMins=ellapsed.getMinutes()
        let button=document.createElement('button')
        button.textContent='like'
        button.setAttribute('data-post-id',post.postID.toString())
        button.addEventListener('click',processLike)
        let liContent=document.createElement('div')
        let liText=document.createElement('p')
        liText.textContent=`${post.post.join('-')} (user ${post.userID}) [${ellapsedMins} mins ago] [likes:${post.likes}]`
        li.appendChild(liText)
        li.appendChild(button)
        recentPostList.appendChild(li)
    })
}

function processLike(event){
    let likedPostId=event.target.getAttribute("data-post-id");
    console.log('you liked '+likedPostId)
    let matchedPost=recentPosts.find(post=>post.postID==likedPostId)
    if(matchedPost){ //check that it has found a match, if it did not this will be undefined
        matchedPost.likes++
        updateRecentPosts()
    } else {
        //no matched post
    }

}