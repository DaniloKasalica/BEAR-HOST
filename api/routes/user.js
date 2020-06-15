require('dotenv').config();


const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const validation = require('../middleware/validation');
const auth  = require('../middleware/auth').authuser;
const productController = require('../controller/productuser')

router.post('/signup',validation.newuser , auth.encpassword, userController.adduser);
router.get('/security/:token',auth.authenticateBlockToken,userController.login) //usmjeriti na log in stranicu ili automatski ulogovati


router.post('/login',auth.login,userController.login)
router.post('/token',userController.refreshToken)
router.post('/logout', userController.logout)

router.get('/products/:parentname',productController.FindProductsByParentName)
router.get('/marketingproducts',productController.FindMarketingProducts)
module.exports = router;