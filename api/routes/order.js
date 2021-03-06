const express = require('express');
const router = express.Router();
const orderController = require('../controller/order');
const auth  = require('../middleware/auth').authuser;

//router.post('/',auth.authenticateToken,orderController.AddNewOrder)
router.post('/',auth.authenticateToken,orderController.AddNewOrder)
router.get('/',auth.authenticateToken,orderController.GetUserOrders)
router.get('/:orderid',auth.authenticateToken,orderController.GetUserOrderProducts)
module.exports = router