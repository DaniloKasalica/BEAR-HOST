const productService = require('../service/product')
const tokenService = require('../service/token')
const marketingServic = require('../service/marketing')
const jwt = require('jsonwebtoken')
const product = {
    FindProductsByParentName: async(req,res)=>{
        try{
     const result = await  productService.FindProductsByTip(req.params.parentname)
     res.status(200).send(result)
        }catch(err){
         res.status(400).send({error: err.message})
        }
    },
    FindMarketingProducts: async(req,res)=>{
       try{
          const result = await marketingServic.FindMarketingProducts()
          res.status(200).send(result)
       }catch(err){
          res.status(400).send({error: err.message})
       }
    }
 }
 module.exports = product;