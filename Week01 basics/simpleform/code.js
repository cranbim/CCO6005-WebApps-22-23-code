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
let maxRecents=3


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
        console.log("too many words: maximum 5!")
        wordsNow=inputWords.slice(0,5)
        // console.log(wordsNow)
        words.value=wordsNow.join(' ')
    } else {
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
            userID: user.userID,
            post: [...currentWords],
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
        li.textContent=`${post.post.join('-')} (user ${post.userID})`
        recentPostList.appendChild(li)
    })
}