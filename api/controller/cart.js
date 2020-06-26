
const cartService = require('../service/cart')
const cart = {
    AddNewCart : async(req,res,next)=>{
        try{
     const result = await  cartService.AddNewCart(req.params.id)
     const cartID = result.insertId
     await Promise.all(
        req.body.products.map(async (elem) => {
          await cartService.AddNewCartProduct(cartID,elem.productid,elem.pricepacket)
      }));
     res.sendStatus(201)
        }catch(err){
           return res.sendStatus(400)
        }
        
    },
    FindUserCarts: async(req,res,next)=>{
      try{
   const result = await  cartService.FindUserCartsByUserID(req.params.id)
   res.status(200).send({carts: result})
      }catch(err){
         return res.sendStatus(400)
      }
      
  }
}
const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

module.exports = cart;