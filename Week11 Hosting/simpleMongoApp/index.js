const express=require('express')
const app = express()
app.listen(3000, ()=> console.log('listening at port 3000'))

app.use(express.static('public'))
// app.use(express.json())
const BodyParser = require('body-parser');
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

require('dotenv').config();
const mongoDBPath=process.env.MYMONGODBPATH

const mongoose=require('mongoose');
mongoose.connect(mongoDBPath)

const simpleSchema = new mongoose.Schema({
    message: String
});

const Simple = mongoose.model('Simple', simpleSchema);

// const test = new Simple({
//     message: "hello"
// });
   
// Simple.create(test); 

app.post("/testdata", async (request, response) => {
    console.log(request.body)
    const document = {
        message: request.body.message
    }
    Simple.create(document)
        .catch(err=>{
            console.log('Error:'+err)
        });
    response.send("Data received, thanks")
    // response.redirect("trees.html")
});

