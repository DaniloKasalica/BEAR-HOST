const express = require('express');
const router = express.Router();
const orderController = require('../controller/order');
const auth  = require('../middleware/auth').authadmin;

//admin/orders
router.put('/',auth.authenticateToken,orderController.ChangeStatus)
router.get('/',auth.authenticateToken,orderController.GetAllOrders)
router.get('/:orderid',auth.authenticateToken,orderController.GetOrderProducts)

module.exports = router