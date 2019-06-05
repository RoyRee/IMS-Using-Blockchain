const express= require('express');
//smart contract files import
const bodyParser= require('body-parser');
const cors=require('cors');
const PORT=5000;
const Web3=require('web3');
const HDWalletProvider = require("truffle-hdwallet-provider");
const seedPhrase="<seed Phrase>";
const infuraurl="<Enter your INFURA LINK >";
const maincontract=require("./build/main_contract.json");
//database file  import
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const provider = new HDWalletProvider(seedPhrase,infuraurl);
const web3 = new Web3(provider);
const instance = new web3.eth.Contract(JSON.parse(maincontract.interface),'<Contact address>');
const fs=require('fs');
const moment=require('moment');
//middleware
app.use(cors());
app.use(bodyParser.json());

// Mongo URI
const mongoURI = '<Databse URI>';


// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});
var date = moment().format();

console.log(date);

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
          const filename = 'file_'+ date + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
        
      
      
    }
});
const upload = multer({ storage });

app.get('/checkaccess', async(req, res) => {
 // res.send('concection ok');
    const account= await web3.eth.getAccounts();
    // console.log(account);
    const acessValue= await instance.methods.deviceData(0).call();
    res.send(acessValue[2]);
});

// @route POST /upload
// @desc  Uploads file to DB
app.post('/upload',upload.single('file'),async(req, res) => { // file name given as of input type
    // res.json({ file: req.file });
    //const account= await web3.eth.getAccounts();
    //const acessValue= await instance.methods.deviceData(0).call();
    res.send('File Uploded');
    //res.redirect('/');
});

app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: 'No files exist'
        });
      }
  
      // Files exist
      return res.json(files);
    });
  });


  app.get('/files/:filename', (req, res) => {
    gfs.files.findOne({filename: req.params.filename},(err, file) => {
      // Check if files
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No files exist'
        });
      }
  
      // Files exist
      return res.json(file);
    });
  });
let datatel;


 app.get('/image/:filename',  (req, res) => {
    gfs.files.findOne({filename: req.params.filename},(err, file) => {
      // Check if files 1
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No files exist'
        });
      }
      //check if image 2
      if(file.contentType==='image/jpeg' || file.contentType==='image/png' ){
          //read image 3
        const readstream = gfs.createReadStream(file.filename);
        const output= fs.createWriteStream('tempo.jpg'); 
        readstream.pipe(res);
        //res.sendFile(__dirname+'\\'+'tempo.jpg');
        //fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        
         
         //res.download(file.filename); 5
      }else if(file.contentType==='text/csv'){
        const readstream = gfs.createReadStream(file.filename);
         readstream.pipe(res);
        //try hard 6

        //bettween try hard 7
      }else if(file.contentType==='application/pdf'){
        const readstream = gfs.createReadStream(file.filename);
         readstream.pipe(res);
        
         //var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl; 8
   
      }else if(file.contentType==='text/plain'){
        const readstream = gfs.createReadStream(file.filename);
         readstream.pipe(res);
        
         //var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl; 8
   
      }else{
        return res.json(file);
      }
      // Files exist 9
    });
  
});

app.get('/demo',(req,res)=>{
  console.log('HIiiii');
  res.send("done");
})

app.listen(PORT,function(){
    console.log("serveri is running at port no :"+ PORT);
})
