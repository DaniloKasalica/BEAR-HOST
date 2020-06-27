const express = require('express');
const router = express.Router();
const orderController = require('../controller/order');
const auth  = require('../middleware/auth').authuser;

//router.post('/',auth.authenticateToken,orderController.AddNewOrder)
router.post('/',auth.authenticateToken,orderController.AddNewOrder)


module.exports = router