const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart');
const auth  = require('../middleware/auth').authuser;

router.post('/',auth.authenticateToken,cartController.AddNewCart)
//router.get('/',auth.authenticateToken,cartController.FindAllCartsByUserID)


module.exports = router