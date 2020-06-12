const express = require('express');
const router = express.Router();
const productController = require('../controller/product');
const validation = require('../middleware/validation');
const auth  = require('../middleware/auth');

router.post('/',auth.authenticateToken)


module.exports = router