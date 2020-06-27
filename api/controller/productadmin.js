const productService = require('../service/product')
const tokenService = require('../service/token')
const marketingServic = require('../service/marketing')
const jwt = require('jsonwebtoken')
const product = {
   UpdateProduct: async(req,res)=>{
       try{
         await Promise.all(
            req.body.products.map(async (elem) => {
               await  productService.UpdateProdByID(eleme.id,elem)
          }))
    res.status(200).send(req.body)
       }catch(err){
        res.status(400).send({error: err.message})
       }
   },
   RemoveProduct: async(req,res)=>{
      try{
   const result = await  productService.DeleteProductByID(req.params.productID)
   res.sendStatus(200)
      }catch(err){
       res.status(400).send({error: err.message})
      }
  },
   UpdateMarketing: async(req,res)=>{
      try{
         await Promise.all(
            req.body.marketing.map(async (elem) => {
                await marketingServic.UpdateMarketingByID(elem.id,elem)
          }))
         res.status(201).send(req.body)
      }catch(err){
         res.status(400).send({error: err.message})
      }
   },
   AddNewProd: async(req,res)=>{
      try{console.log(req.params.PacketID)
         const result = await productService.InsertIntoTable(req.body,req.params.PacketID)
         res.sendStatus(200)
      }catch(err){
         return res.status(400).send({error: err.message})
      }
   },
   AddNewProdMarketing: async(req,res)=>{
      try{
         const result = await marketingServic.InsertIntoTable(req.body,req.params.PacketID) 
         res.status(200).send('New marketing product')
      }catch(err){
         res.status(400).send({error: err.message})
      }
   }
}
module.exports = product;