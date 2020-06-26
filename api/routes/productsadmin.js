
const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const validation = require('../middleware/validation');
const auth  = require('../middleware/auth');
const productController = require('../controller/productadmin')

//admin/products/
router.put('/:productID',/*auth.authadmin.authenticateToken,*/productController.UpdateProduct)
router.put('/marketing/:MarketingID',/*auth.authadmin.authenticateToken,*/productController.UpdateMarketing)
router.post('/:PacketID',/*auth.authadmin.authenticateToken,*/productController.AddNewProd)
router.delete('/:productID',/*auth.authadmin.authenticateToken,*/productController.RemoveProduct)
//router.post('/newmarketingprod/:PacketID',/*auth.authadmin.authenticateToken,*/productController.AddNewProdMarketing)


module.exports = router