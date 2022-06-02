const connection=require('../connection'); 
const {getAllUser} =require('../Subscribers/existUser'); 
const {getCart} =require('../Subscribers/promiseHandler');

module.exports ={
    get:async(req,res)=>{ 
        let data =req.body; 
        let requiredObj; 
        let data1=await getCart(data.user_id);   

        let getdata = `select * from user_cart where user_id=${data.user_id};`;
        connection.query(getdata,(err,results)=>{ 
            if(err){
               throw err; 
            }
            else{ 
                if(data.product_id){
                    for (let i = 0; i < results.length; i++) {
                        if(results[i].user_id===data.user_id && results[i].product_id===data.product_id){
                            requiredObj=results[i]; 
                            break;
                        }
                    } 
                    res.status(200).json({
                        success:1,
                        data:requiredObj,
                        message:"Fetch Data Succesfully"
                    });
                }
                else{ 
                    res.status(200).json({
                        success:1,
                        data:data1.results,
                        message:"Fetch Data Succesfully"
                    });
                }
            }
        });
    },
    post:async(req,res)=>{
        userProductData=req.body;
        let requiredObj;
         
        data={
            user_id:userProductData.userid,
            product_id:userProductData.product.id,
            quantity:userProductData.count,
            price:userProductData.count*userProductData.product.price
        }
 
        
        const results = await getAllUser(); 

        let isExit=false; 
        
        for (let i = 0; i < results.length; i++) {
            if(results[i].user_id===data.user_id && results[i].product_id===data.product_id){
                requiredObj=results[i];
                isExit=true;
                break;
            }
        }  

        if(isExit){ 
            let price=  data.price;
            let quantity= data.quantity;
            let updatedata =`Update user_cart 
                            set quantity=${quantity},price=${price}
                            where id=${requiredObj.id}`; 
            connection.query(updatedata,(err,results)=>{
                if(err){
                    throw err;
                }
                else{
                    res.status(200).json({
                        success:1,
                        data:results,
                        message:"Fetch Data Succesfully"
                    });
                }
            })
        } 
        else{
           let postdata=`Insert into user_cart(user_id,product_id,quantity,price) 
                         VALUES (${data.user_id},${data.product_id},${data.quantity},${data.price});`
            
           connection.query(postdata,(err,results)=>{
                   if(err){
                       throw err;
                   }
                   else{
                       res.status(200).json({
                           success:1,
                           data:results,
                           message:"Fetch Data Succesfully"
                       });
                   }
           })
       }
    },
    delete:(req,res)=>{
        data=req.params; 

        let deleteData =`Delete from user_cart where id=${data.id};`;
        console.log(deleteData);
        connection.query(deleteData,(err,results)=>{
            if(err) throw err;
            res.status(200).json({
                success:1,
                message:`Deleted Succesfully`,
            });
        });
    }
}