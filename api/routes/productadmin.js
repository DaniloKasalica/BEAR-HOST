
const express = require('express');
const router = express.Router();
const productController = require('../controller/product');
const validation = require('../middleware/validation');
const auth  = require('../middleware/auth');

router.put('/update/:prodname',auth.authadmin.authenticateToken,productController.UpdateProduct)

module.exports = router