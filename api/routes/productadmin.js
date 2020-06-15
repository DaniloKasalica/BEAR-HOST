
const express = require('express');
const router = express.Router();
const productController = require('../controller/productadmin');
const validation = require('../middleware/validation');
const auth  = require('../middleware/auth');
//admin/products/
router.put('/update/:prodname',auth.authadmin.authenticateToken,productController.UpdateProduct)
router.put('/update/home/:prodname',auth.authadmin.authenticateToken,productController.UpdateProductMarketing)
router.post('/newprod',auth.authadmin.authenticateToken,productController.AddNewProd)
router.post('/newmarketingprod',auth.authadmin.authenticateToken,productController.AddNewProdMarketing)
module.exports = router