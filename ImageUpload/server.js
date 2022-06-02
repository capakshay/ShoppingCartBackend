const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require('multer');
const mysql =require('mysql');
path = require('path') 

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'ecommerce'
});

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/uploads')));

app.listen(3300, () => {
    console.log("The server started on port 3300 !!!!!!");
});

let i=0;
let x=0;

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
          
        //console.log(myArray); 
        let modifyFileName = `Ecom_${file.originalname}_${i}.jpg`;
        i=i+1;
        callBack(null, `${modifyFileName}`)
    }
    
  })
  
const upload = multer({ storage: storage }) 

app.get("/", (req, res) => {
    res.send(
       
    );
  });

app.post('/file', upload.single('file'), (req, res, next) => {
    
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
    res.send(file);
})

app.post('/multipleFiles', upload.array('files'), (req, res, next) => {
    const files = req.files; 
    console.log(files);
    i=0;
      
      if (!files) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
    res.send({sttus:  'ok'});
  })