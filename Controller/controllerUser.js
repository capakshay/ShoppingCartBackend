const {sign} = require('jsonwebtoken');
const connection=require('../connection');
const moment=require('moment');
const {getUserByUserEmail}=require('../service/UserService');


module.exports={
    get:(req,res)=>{
        let getdata ="select * from user;";
        connection.query(getdata,(err,results)=>{
            if(err) throw err;  
            res.send(results);
        });
    }, 
    checkLogin:(req,res)=>{
        let body=req.body;
    
        getUserByUserEmail(body.username,(err,results)=>{
            if(err){
                console.log(err);
            } 
            if(!results){
                return res.json({
                    success:0,
                    message:"Invalid Username and Password"
                });
            }
            const result = body.password===results.password?true:false;
            
            if(result){
                results.password =undefined;
                const jsontokenwithoutBearer =sign( {result:results},"akshay",{expiresIn:"1hr"});
                const jsontoken =`Bearer ${jsontokenwithoutBearer}`
                 
                return res.json({
                    data:results,
                    success:1,
                    message:"Login Successfully",
                    token:jsontoken
                });
            }
            else{
                return res.json({
                    success:0,
                    message:"Invalid Username and Password"
                });
            }
        })
    },  
    post:(req,res)=>{ 
        let is_active=1;
        let role="role_user";
        let create_Date =moment().format();
        let update_Date =moment().format();
        
        let postdata =`Insert into user(username,password,first_name,last_name,mobile_no,email,address,role,is_active,create_date,update_date)
        VALUES('${req.body.username}','${req.body.password}','${req.body.firstname}',
        '${req.body.lastname}','${req.body.mobileNo}','${req.body.email}','${req.body.address}','${role}'
        ,${is_active},'${create_Date}','${update_Date}');`;
        
        connection.query(postdata,(err,results)=>{
            if(err) throw err;  
            res.send(results);
        }); 
    },
    
}