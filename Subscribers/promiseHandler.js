const connection=require('../connection');
 
const getAllProductsWithImages =async ()=> {
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT product.*, product_images.img_url,product_images.prod_id_FK, product_images.id as image_id
        FROM product inner join product_images  on product_images.prod_id_FK = product.id
        where product.is_active = '1'`,(err,results)=>{
            if(err)reject({error: true, message: err.msg})
    
            resolve({error: false, results})
        })
    })
}
const getCart =async (number)=> {
    return new Promise((resolve, reject)=>{
        let query=`select * from
        (SELECT uc.id,uc.user_id,uc.product_id,uc.quantity,pd.name,pd.is_active,pd.price,pd.img_url from user_cart as uc
            inner join
                (select pd.*,pi.img_url from product as pd inner join product_images as pi  
                    on pd.id=pi.prod_id_FK
                    where is_active=1 group by pd.id) as pd
            on uc.product_id = pd.id
            where pd.is_active = '1' ) as t
        where t.user_id=${number} ;`

        connection.query( query,(err,results)=>{
            if(err)reject({error: true, message: err.msg})
    
            resolve({results})
        })
    })
}


module.exports = { getAllProductsWithImages,getCart}