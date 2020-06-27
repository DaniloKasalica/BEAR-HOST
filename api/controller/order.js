
const orderService = require('../service/order')
const cartService = require('../service/cart')
const order = {
    AddNewOrder : async(req,res,next)=>{
        try{
     const result = await  orderService.AddNewOrder(req.params.id)
     const orderId = result.insertId
     await Promise.all(
      req.body.products.map(async (elem) => {
        await orderService.AddNewOrderProduct(orderId,elem.productid,elem.pricepacket)
    }))
     req.body.orders = await orderService.SelectOrders(orderId)
     res.sendStatus(201)
     const cartID =  (await cartService.FindCartIDByUserID(req.params.id)).cartid
     await cartService.RemoveAllCart_productsByCartID(cartID)
     next()
        }catch(err){
           return res.status(400).send({error: err})
        }
        
    },
    AddNewOrder_2 : async(req,res,next)=>{
      try{
   const cartID =  (await cartService.FindCartIDByUserID(req.params.id)).cartid
   const products = await cartService.FindCartProductsByCartID(cartID)
   const result = await  orderService.AddNewOrder(req.params.id)
   const orderId = result.insertId
   await Promise.all(
    products.map(async (elem) => {
      await orderService.AddNewOrderProduct(orderId,elem.productid,elem.pricepacket)
  }))
  await cartService.RemoveAllCart_productsByCartID(cartID)
  req.body.orders = await orderService.SelectOrders(orderId)
   res.sendStatus(201)
   next()
      }catch(err){
         return res.status(400).send({error: err})
      }
      
  }
}
const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

module.exports = order;