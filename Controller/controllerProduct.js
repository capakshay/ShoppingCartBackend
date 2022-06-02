const connection=require('../connection');
const moment=require('moment');
const {getAllProductsWithImages} = require('../Subscribers/promiseHandler')

module.exports={
    getAllImgUrl:(req,res)=>{ 
        let gAll=`Select pi.img_url,pi.prod_id_FK 
                  from product p Join product_images pi
                  ON p.id = pi.prod_id_FK
                  where pi.prod_id_FK=${req.params.id};`; 
        connection.query(gAll,(err,results)=>{
            if(err) throw err;  
            res.send(results);
        });
    },
    getAllProd:async (req,res)=>{
        const {error: gpError, results: gpResult} = await getAllProductsWithImages()
            
        if(gpError) {
            res.status(400).send({code: 400, message: 'Database service not enable'})
        }

        const images = gpResult.map(item=> {
            const obj =   {imageUrl: item.img_url || '', prodId: item.id }
     
            delete item.image_id
            delete item.prod_id_FK
            delete item.img_url
            delete item.create_date
            delete item.update_date
            return obj
         }
              )
     
     const uniqueProd = gpResult.filter((a, i) => 
                        gpResult.findIndex((s) => a.id === s.id) === i)
     
     const finaleRes = uniqueProd.map(item =>{
         return { 
             ...item,
             images: images.map(i=> {
                 if(i.prodId === item.id) return i.imageUrl
             }).filter(item=>item)
         }
     })
        res.send(finaleRes)
    },
    getById:(req,res)=>{
        let gById =`Select * from product where id=${req.params.id}`;
        connection.query(gById,(err,results)=>{
            if(err) throw err; 
            
            res.send(results);
        });
    },
    postData:(req,res) => { 
        let name=req.body.name;
        let price=req.body.price;
        let quantity=req.body.currentCount;
        let is_active = true;
        let create_Date =moment().format();
        let update_Date =moment().format();
       
        let postIntoProduct =`INSERT INTO product (name, price,quantity,is_active,create_date,update_date) 
                        VALUES ('${name}',${price},${quantity} ,${is_active},'${create_Date}',
                        '${update_Date}');`;
                
        connection.query(postIntoProduct,(err,results)=>{
            
             for(let j=0;j<req.body.imageCount;j++){
                 let tempurl = `http://localhost:3300/Ecom_${name}_${j}.jpg`; 
                 let postInto =`INSERT INTO product_images ( prod_id_FK,img_url,create_date,update_date) 
                            VALUES (${results.insertId},'${tempurl}','${create_Date}',
                                '${update_Date}');`; 
                                console.log(postInto);
                 connection.query(postInto,(err,results)=>{ 
                  if(err) throw err; 
                 });
             }

            if(err) throw err; 
            res.send("");
        });       
    },
    putData:(req,res)=>{ 
        let update_Date =moment().format();
      console.log(req.body);
        let putvar = `UPDATE product 
                      SET name='${req.body.name}',price='${req.body.price}',
                      quantity='${req.body.quantity}',is_active=1,
                      update_date='${update_Date}'
                      WHERE id = ${req.params.id};` 
        console.log(putvar);
        connection.query(putvar,(err,results)=>{
            if(err) throw err; 
            res.send(`${req.params.id}`);
        }); 
    },
    deleteData:(req,res)=>{
        console.log(req.params);

        let deleteData = `UPDATE product 
                            SET is_active=0
                            WHERE id = ${req.params.id};`; 
        connection.query(deleteData,(err,results)=>{
            if(err) throw err; 
            res.send(`${req.params.id}`);
        });
    }
}