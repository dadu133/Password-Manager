import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
const app=express();
const uri='mongodb://127.0.0.1/passop'
const client=new MongoClient(uri);
const port=3000;
app.use(bodyParser.json())
app.use(cors())
// async function run(){
//     await client.connect();
    
//     console.log(a);
//     console.log("Hello")
//     let a=await client.db('passop').collection('password').insertOne({"a":"hello"});

// }
// run();
await client.connect();
app.get('/',async(req,res)=>{
    let a=client.db('passop').collection('password');
        const ress=await a.find({}).toArray();
        res.json(ress) 
})
//save a password
app.post('/',async(req,res)=>{
    const password=req.body
       let a=client.db('passop').collection('password');
        const ress=await a.insertOne(password)
        res.json(req.body) 
})
app.delete('/',async(req,res)=>{
    const password=req.body
       let a=client.db('passop').collection('password');
        const ress=await a.deleteOne(password)
        res.json(ress); 
})

app.listen(port,()=>{
    console.log("App is listening");
})