const mysql= require('mysql');

const connection=mysql.createConnection({
    host:"localhost",
    database:"ecommerce",    
    user:"root",
    password:"root"
});

module.exports=connection;