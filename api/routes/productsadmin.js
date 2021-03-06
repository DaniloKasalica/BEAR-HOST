
const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const validation = require('../middleware/validation');
const auth  = require('../middleware/auth');
const productController = require('../controller/productadmin')

//admin/products/
router.put('/',/*auth.authadmin.authenticateToken,*/productController.UpdateProduct)
router.put('/marketing',/*auth.authadmin.authenticateToken,*/productController.UpdateMarketing)
router.post('/',/*auth.authadmin.authenticateToken,*/productController.AddNewProd)
router.delete('/',/*auth.authadmin.authenticateToken,*/productController.RemoveProduct)
//router.post('/newmarketingprod/:PacketID',/*auth.authadmin.authenticateToken,*/productController.AddNewProdMarketing)


module.exports = router