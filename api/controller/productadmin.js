const productService = require('../service/product')
const tokenService = require('../service/token')
const marketingServic = require('../service/marketing')
const jwt = require('jsonwebtoken')
const product = {
   UpdateProduct: async(req,res)=>{
       try{
    const result = await  productService.UpdateProdByName(req.params.prodname,req.body)
    res.status(200).send(req.body)
       }catch(err){
        res.status(400).send({error: err.message})
       }
   },
   UpdateProductMarketing: async(req,res)=>{
      try{
         const result = await marketingService.UpdateProdByName(req.params.prodname,req.body)
         res.status(200).send(req.body)
      }catch(err){
         res.status(400).send({error: err.message})
      }
   },
   AddNewProd: async(req,res)=>{
      try{
         const result = await productService.InsertIntoTable(req.body)
         res.status(200).send('new product')
      }catch(err){
         return res.status(400).send({error: err.message})
      }
   },
   AddNewProdMarketing: async(req,res)=>{
      try{
         const result = await marketingServic.InsertIntoTable(req.body) 
         res.status(200).send('New marketing product')
      }catch(err){
         res.status(400).send({error: err.message})
      }
   }
}
module.exports = product;