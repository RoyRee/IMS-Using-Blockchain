const express= require('express');
//smart contract files import
const bodyParser= require('body-parser');
const cors=require('cors');
const PORT=5000;
const Web3=require('web3');
const HDWalletProvider = require("truffle-hdwallet-provider");
const seedPhrase="<Enter Your Seed Phrase>";
const infuraurl="<Enter Your Infura Link>";
const maincontract=require("./build/main_contract.json");
//database file  import
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const setUPFile = require('./setUpFile');
const app = express();
const provider = new HDWalletProvider(seedPhrase,infuraurl);
const web3 = new Web3(provider);
const instance = new web3.eth.Contract(JSON.parse(maincontract.interface),contractAddress);

//middleware
app.use(cors());
app.use(bodyParser.json());

// Mongo URI
const mongoURI = '<Enter Your URI >';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
        
      }).catch((err) => {
        console.log('Promise rejected');
      });
    }
});
const upload = multer({ storage });

app.get('/',async (req,res)=>{
    console.log("Connection ok");
    // const account= await web3.eth.getAccounts();
    // console.log(account);
    // const acessValue= await instance.methods.deviceData(0).call();
    // console.log(acessValue[2]);

    res.send("Connection ok");
})
// @route POST /upload
// @desc  Uploads file to DB
app.post('/upload',async(req, res) => { // file name given as of input type
    // res.json({ file: req.file });
    const account= await web3.eth.getAccounts();
    const acessValue= await instance.methods.deviceData(0).call();
    console.log(acessValue[2]);
    if(!acessValue[2]){
        upload.single('file');
    }else{
        res.send('NO Accesss')
    }
    
    //res.redirect('/');
});

app.listen(PORT,function(){
    console.log("serveri is running at port no :"+ PORT);
})
