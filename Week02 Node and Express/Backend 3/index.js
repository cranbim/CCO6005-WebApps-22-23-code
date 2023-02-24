const express=require('express')
const app=express()

app.listen(3000, ()=> console.log('listening on port 3000'))

const path=require('path')

app.use(express.static('public'))
app.use(express.json())

app.get('/goodbye', (request, response) => {
    response.sendFile(path.join(__dirname, '/hello.html'))
})

let rabbitData=[
    {name: 'noodle', colour:'white'},
    {name: 'blossom', colour:'aguti'}
]
    
app.get('/data', (request, response)=>{
    response.json({
        time: Date.now(),
	    data: rabbitData
    })
})

app.post('/new', (request, response)=>{
    let newRabbit=request.body
	//carry out data validation
    rabbitData.push(newRabbit)
    response.json({
        status: 'success',
		numberOfRabbits: rabbitData.length
    })
})



