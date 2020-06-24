

const express = require('express');
const router = express.Router();
const auth  = require('../middleware/auth').authadmin;
const commentController = require('../controller/comments')


router.put('/:CommentID'/*,auth.authenticateToken*/, commentController.UpdateComments)
//router.post('/', commentController.AddNewComment)

module.exports = router