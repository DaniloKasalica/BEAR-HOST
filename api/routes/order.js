const express = require('express');
const router = express.Router();
const orderController = require('../controller/order');
const validation = require('../middleware/validation');
const auth  = require('../middleware/auth').authuser;

router.post('/',auth.authenticateToken,orderController.AddNewOrder)


module.exports = router