require('dotenv').config();


const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const validation = require('../middleware/validation');
const auth  = require('../middleware/auth').authuser;
const productController = require('../controller/productuser')
const cartController = require('../controller/cart')

router.post('/signup',validation.newuser , auth.encpassword, userController.AddUser,cartController.AddNewCart);
router.get('/security/:token',auth.authenticateBlockToken) //usmjeriti na log in stranicu ili automatski ulogovati

router.post('/login',auth.login,userController.login)
router.post('/token',userController.refreshToken)
router.post('/logout', userController.logout)

router.put('/setings/update',auth.authenticateToken,validation.updateuser, auth.encpassword,userController.UpdateUser)
router.put('/security/password',userController.RessetPassword)

//router.get('/products/:marketingname',productController.FindProductsByMarketingName)
//router.get('/marketingproducts',productController.FindMarketingProducts)
module.exports = router;
