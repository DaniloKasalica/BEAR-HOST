

const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const adminController = require('../controller/admin')
const validation = require('../middleware/validation');
const auth  = require('../middleware/auth').authadmin;


//router.post('/singup',validation.newuser, auth.encpassword, adminController.addadmin);
router.post('/login',auth.login,adminController.login)
router.post('/token',adminController.refreshToken)
router.post('/logout', adminController.logout)
router.post('/',)
router.get('/security/:token',auth.authenticateBlockToken,adminController.login)

module.exports = router;