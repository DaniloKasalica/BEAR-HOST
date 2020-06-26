const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart');
const auth  = require('../middleware/auth').authuser;

router.put('/',auth.authenticateToken,cartController.UpdateCart)
router.get('/',auth.authenticateToken,cartController.FindUserCarts)
router.delete('/:cartproductID',auth.authenticateToken,cartController.RemoveFromCart)


module.exports = router