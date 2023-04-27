const { MongoClient, ObjectID } = require("mongodb");
const Express = require("express");

const BodyParser = require('body-parser');

const server = Express();

server.use(Express.static('public'))

server.use(BodyParser.json());
server.use(BodyParser.urlencoded({ extended: true }));

require('dotenv').config();
const mongoDBconnectionString=process.env.MYMONGODBURI
// console.log("!!!"+mongoDBconnectionString)
const client = new MongoClient(mongoDBconnectionString);

var collection;

// schema
// tree: name (string)
// colour: [int,int,int]
// size: int
// type: int

// server.post("/plummies", async (request, response, next) => {});
// server.get("/plummies", async (request, response, next) => {});
// server.get("/plummies/:id", async (request, response, next) => {});
// server.put("/plummies/:plummie_tag", async (request, response, next) => {});

async function writeSomething(data){
    let result = await collection.insertOne(data);
    console.log(result)
}

server.listen("3000", async () => {
    try {
        await client.connect();
        collection = client.db("FOI2023").collection("trees01");
        console.log("Listening at :3000...");
        // await writeSomething({
        //     treeName: "I am Groot",
        //     colour: "red",
        //     size: 3
        // })
    } catch (e) {
        console.error(e);
    }
});

server.post("/treedata", async (request, response) => {
    console.log(request.body)
    await writeSomething({
        treeName: request.body.treename,
        colour: request.body.treesize,
        size: request.body.treecolour
    })
    response.send("Data received, thanks")
    // response.redirect("trees.html")
});

server.get("/treedata", async (request, response) => {
    let treeData = await getAllTrees();
    response.send(treeData)
})

async function getAllTrees(){
    let data=[];
    try{
        data=await collection.find({}).toArray();
    } catch(err){
        console.log('Error:'+err)
    }
    return data;
}
