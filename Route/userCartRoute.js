const express = require("express");  
const router =express.Router();
const userCart=require('../Controller/controllerUserCart');
const checkLogin=require('../auth/token_validation');

router.post('/getCart', checkLogin.checkTokenForUser,userCart.get);
router.post('/',userCart.post); 
router.delete('/delete/:id',userCart.delete);

module.exports=router;