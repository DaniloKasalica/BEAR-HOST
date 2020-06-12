require('dotenv').config();


const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const validation = require('../middleware/validation');
const auth  = require('../middleware/auth').authuser;


router.post('/singup',validation.newuser , auth.encpassword, userController.adduser);
router.get('/security/:token',auth.authenticateBlockToken,userController.login) //usmjeriti na log in stranicu ili automatski ulogovati


router.post('/login',auth.login,userController.login)
router.post('/token',userController.refreshToken)
router.post('/logout', userController.logout)
module.exports = router;