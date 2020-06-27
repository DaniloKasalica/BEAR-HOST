const productService = require('../service/product')
const tokenService = require('../service/token')
const commentsService = require('../service/comments')
const jwt = require('jsonwebtoken')
const comments= {
   UpdateComments:async (req,res)=>{
      try{
         await Promise.all(
            req.body.comments.map(async (elem) => {
               await commentsService.UpdateCommentsByID(req.params.CommentID,elem)
          }))
         res.status(201).send(req.body)
      }catch(err){
         res.status(400).send({error: err.message})
      }
   },
   AddNewComment: async(req,res)=>{
      try{
         const result = await commentsService.InsertIntoTable(req.body,req.params.PacketID) 
         res.status(200).send('New marketing product')
      }catch(err){
         res.status(400).send({error: err.message})
      }
   },
   FindAllComments: async(req,res)=>{
      try{
         const result = await commentsService.FindComments()
         res.status(200).send(result)
      }catch(err){
         res.status(400).send({error: err.message})
      }
   }
}
module.exports = comments;