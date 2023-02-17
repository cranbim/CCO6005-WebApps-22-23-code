console.log("Simple Posting App")

let postInput=document.querySelector("#words")
postInput.addEventListener('input',postChanged)
postInput.addEventListener('keypress', checkIfReturn)

function postChanged(event){
    console.log(event.target.value)
}

function checkIfReturn(event){
    if(event.key === "Enter" || event.which===13){
        event.preventDefault();
    }
}