const MongoClient= require('mongodb').MongoClient;
const url="<Enter Your URI>";
const dbName= '<Enter Your Database Name>';
const bodyParser= require('body-parser');
const cors = require('cors');
const PORT=4000;
const express= require('express');
const assert = require('assert');
const fs = require("fs");

const app = express();
app.use(cors());
//app.use(bodyParser.json());



app.get('/showData',(req,res)=>{

    MongoClient.connect(url,function(err,client){
        if(err){
           res.send(err);
        }else{
           const db = client.db(dbName);
           const collection = db.collection('uploads.files');
           const collectionChunks = db.collection('uploads.chunks');
    
           collection.find().toArray(function(err,docs){
               if(err){
                   console.log(err);
               }
               if(!docs || docs.length ===0){
                   console.log("No file Found");
               }
    
               res.send(docs);
           })
          
        }
    })

})

app.post('/:database/createDatabase',(req,res)=>{
    var database = req.params.database;
    
    var uri ='mongodb+srv://rahul:qwerty123@demo1-hsuoj.mongodb.net/'+database+'?retryWrites=true&w=majority'

    const client = new MongoClient(uri);
    client.connect(function(err,client){
        assert.equal(null,err);
        console.log("connected correctly to the server");

        const db = client.db(database);
        db.collection('userDetails').insertOne({database:database},function(err,r){
            assert.equal(null,err);
            assert.equal(1,r.insertedCount);
        });
        client.close();

    });

    res.send("ok");

})


app.get('/:contractAddress/:userName/setUpFile',async(req,res)=>{
    var contractAddress= req.params.contractAddress;
    var userName= req.params.userName;

    var data =["var contractAddress =" + "'"+contractAddress+"';"+"var userName ='"+userName+"';\n export default {contractAddress,userName};" ];

    await fs.writeFile("setUpFile.js", data, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
      });

      const readstream = fs.createReadStream('setUpFile.js');
      // const output= fs.createWriteStream('output.js'); 
      readstream.pipe(res);

    //   console.log(__dirname+'\\'+'setUpFile.js');
    //   res.sendFile(__dirname+'\\'+'setUpFile.js');

})








app.listen(PORT,function(){
    console.log("Server is running on Port:" + PORT
    );
})


