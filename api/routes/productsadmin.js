
const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const validation = require('../middleware/validation');
const auth  = require('../middleware/auth');
const productController = require('../controller/productadmin')

//admin/products/
router.put('/update/:productID',/*auth.authadmin.authenticateToken,*/productController.UpdateProduct)
router.put('/update/marketing/:MarketingID',/*auth.authadmin.authenticateToken,*/productController.UpdateMarketing)
router.post('/newprod/:PacketID',/*auth.authadmin.authenticateToken,*/productController.AddNewProd)
router.post('/newmarketingprod/:PacketID',/*auth.authadmin.authenticateToken,*/productController.AddNewProdMarketing)


module.exports = router