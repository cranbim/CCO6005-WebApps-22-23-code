const express=require('express')
const { dirname } = require('path')
const app = express()
app.listen(3000, ()=> console.log('listenting on port 3000'))
const path = require('path')

app.get('/hello',(request, response)=>{
    response.sendFile(path.join(__dirname,'/hello.html'))
})

app.use(express.static('public'))

let rabbitData=[
    {name:'noodle', colour:'white'},
    {name: 'blossom', colour:'aguti'}
]

app.use(express.json())

app.get('/data', (request, response) =>{
    response.json({
        time: Date.now(),
        data: rabbitData
    })
})

