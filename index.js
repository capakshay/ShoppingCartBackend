const express =require('express'); 
const app =express(); 
const cors = require("cors");
const connection=require('./connection');
const product =require('./Route/productRoute'); 
const user =require('./Route/userRoute');
const userCart =require('./Route/userCartRoute');

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers" , "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
    next();
});

app.use(cors({ origin: "*" }));

const bodyParser = require("body-parser");
const res = require('express/lib/response');
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.send("Welcome To Ecommerce");
});
 
app.use('/products',product);
app.use('/user',user);
app.use('/user_cart',userCart);

app.listen(3000,()=>{
    console.log("App listening on port 3000");
    connection.connect((err)=>{
        if(err) throw err;
        console.log("Database Connected Succesfully");
    });
});