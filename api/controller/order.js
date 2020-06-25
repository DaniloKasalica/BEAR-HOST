const userService = require('../service/user')
const orderService = require('../service/order')
const jwt = require('jsonwebtoken')
const order = {
    AddNewOrder : async(req,res,next)=>{
        try{
     const result = await  orderService.AddNewOrder(req.params.id)
     const orderId = result.insertId
     await Promise.all(
      req.body.products.map(async (elem) => {
        await orderService.AddNewOrderProduct(orderId,elem.productid,elem.pricepacket)
    }));
    req.body.orders = await orderService.SelectOrders(orderId)
    console.log(req.body.orders)
     res.sendStatus(201)
     next()
        }catch(err){
           return res.status(400)
        }
        
    }
}
const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

module.exports = order;