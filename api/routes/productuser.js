

const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const validation = require('../middleware/validation');
const auth  = require('../middleware/auth').authuser;
const productController = require('../controller/productuser')


router.get('/marketing',productController.FindMarketingProducts)
//router.get('/:marketingID',productController.FindProductsByMarketingID)
//router.get('/:PacketName', productController.FindProductsByPacketName )
router.get('/:PacketID', productController.FindProductsByPacketID)

module.exports = router