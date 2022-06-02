const express = require("express");  
const router =express.Router();
const ControllerProduct =require('../Controller/ControllerProduct');
const checkLogin=require('../auth/token_validation');

router.get('/',ControllerProduct.getAllProd);
router.get('/images/:id',ControllerProduct.getAllImgUrl); 
router.get('/:id',ControllerProduct.getById);
router.post('/', checkLogin.checkTokenForAdmin,ControllerProduct.postData);
router.put('/:id',checkLogin.checkTokenForAdmin,ControllerProduct.putData); 
router.delete('/:id',checkLogin.checkTokenForAdmin,ControllerProduct.deleteData); 
 

module.exports=router;