
const orderService = require('../service/order')
const cartService = require('../service/cart')
const order = {
    AddNewOrder : async(req,res,next)=>{
        try{
     const products = await cartService.FindCartProducts(req.params.cartID,req.params.id)
     const result = await  orderService.AddNewOrder(req.params.id)
     const orderId = result.insertId
     await Promise.all(
      products.map(async (elem) => {
        await orderService.AddNewOrderProduct(orderId,elem.productid,elem.pricepacket)
    }))
    req.body.orders = await orderService.SelectOrders(orderId)
    console.log(req.body.orders)
     res.sendStatus(201)
     next()
        }catch(err){
           return res.status(400).send({error:err.message})
        }
        
    }
}
const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

module.exports = order;