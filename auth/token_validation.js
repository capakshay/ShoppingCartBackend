const {verify} =require('jsonwebtoken');

module.exports={
    checkTokenForUser:(req,res,next)=>{ 
        let token =req.headers.authorization.slice(7);  

        if(token){ 
            verify(token,"akshay",(err,decoded)=>{
                if(err){  
                    res.json({
                        success:0,
                        message:"Invalid Token"
                    })
                }else{ 
                    next(); 
                }
            });
        }else{
            res.json({
                success:0,
                message:"Access denied! unauthorized user"
            })
        }
    },
    checkTokenForAdmin:(req,res,next)=>{
        let token =req.headers.authorization.slice(7);  
        console.log(token);
        if(token){ 
            verify(token,"akshay",(err,decoded)=>{
                if(err){  
                    console.log("Hello");
                    res.status(401).json({
                        success:0,
                        message:"Invalid Token"
                    })
                }else{ 
                    console.log(decoded.result.first_name);
                    
                    if(decoded.result.first_name==='Akshay')
                        next();
                    else{
                        res.json({
                            success:0,
                            message:"Only Admin have Access"
                        })
                    } 
                }
            });
        }else{
            res.status(401).json({
                success:0,
                message:"Access denied! unauthorized user"
            })
        }
    }
}