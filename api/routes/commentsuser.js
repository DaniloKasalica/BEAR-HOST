

const express = require('express');
const router = express.Router();
const commentController = require('../controller/comments')


router.get('/'/*,auth.authenticateToken*/, commentController.FindAllComments)

module.exports = router