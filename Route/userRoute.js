const express = require("express");  
const router =express.Router();
const userContrller = require('../Controller/controllerUser');
const checkLogin=require('../auth/token_validation');

router.get('/',  userContrller.get); //Getting all user Data
router.post('/',userContrller.post);//create new User
router.post('/login',userContrller.checkLogin);//create token of the user who is login 

module.exports=router;