const connection=require('../connection');

 
const getAllUser =async ()=> {
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM  user_cart
        group by user_id,product_id;`,(err,results)=>{
            if(err)reject({error: true, message: err.msg})
            
            resolve(results)
        })
    })
}

const getUserWhoLogin =async()=>{
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM  user_cart;`,(err,results)=>{
            if(err)reject({error: true, message: err.msg})
            
            resolve(results)
        })
    })
}

module.exports = { getAllUser,getUserWhoLogin}