
const cartService = require('../service/cart')
const cart = {
    AddNewCart : async(req,res,next)=>{
        try{
      await  cartService.AddNewCart(req.params.id)
     next()
        }catch(err){
           return res.sendStatus(400)
        }
        
    },
    RemoveFromCart: async(req,res)=>{
       try{
         const CartID  = (await cartService.FindCartIDByUserID(req.params.id)).cartid
         await cartService.RemoveCart_productByID(req.params.cartproductID,CartID)
          res.sendStatus(200)
       }
       catch(err){
          console.log(err)
          res.sendStatus(400)
       }
    },
    UpdateCart: async(req,res)=>{
      try{
         const CartID = (await cartService.FindCartIDByUserID(req.params.id)).cartid
         await Promise.all(
            req.body.products.map(async (elem) => {
              await cartService.AddNewCartProduct(CartID,elem.productid,elem.pricepacket)
          }));
          res.sendStatus(200)
            }catch(err){
               return res.sendStatus(400)
            }
              
    },
    FindUserCarts: async(req,res,next)=>{
      try{
         const CartID = (await cartService.FindCartIDByUserID(req.params.id)).cartid
   const result = await  cartService.FindCartProductsByCartID(CartID)
   res.status(200).send({carts: result})
      }catch(err){
         console.log(err)
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