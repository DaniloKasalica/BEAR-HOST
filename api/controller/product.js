const productService = require('../service/product')
const tokenService = require('../service/token')
const jwt = require('jsonwebtoken')
const product = {
   UpdateProduct: async(req,res)=>{
       try{
    const result = await  productService.UpdateProdByName(req.params.prodname,req.body)
    res.status(200).send(req.body)
       }catch(err){
        res.status(200).send({error: err.message})
       }
   }
}
module.exports = product;