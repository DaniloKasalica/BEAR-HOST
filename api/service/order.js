const Module = require('../model/model')


const order = {
  AddNewOrder: async (userID) =>{
try{
  const sql= `INSERT INTO Orders (UserID)
  VALUES (${userID})`
   const result =  await Module.query(sql)
   return Promise.resolve(result)
   }catch(err){
     return Promise.reject(err)
   }
  },
  SelectOrders: async(orderID)=>{
    try{
    sql = `SELECT orderID, UserID, OrderTime,email,ProductName,price_1,price_2,price_3,Pricepacket
    FROM orders_view
    JOIN products ON orders_view.ProductID = products.ProductID
    WHERE OrderID = ${orderID}`
    const result = await Module.query(sql)
    return Promise.resolve(result)
    }catch(err){
      return Promise.reject(err)
    }

  },
   AddNewOrderProduct: async(orderID, productID,pricepacket)=>{
     try{
       const sql = `
       INSERT INTO order_products(
       OrderID,
       ProductID,
       PricePacket 
       ) VALUES ?`
       const result = await Module.query(sql,[[[orderID,productID,pricepacket]]])
       return Promise.resolve(result)
     }catch(err){
       return Promise.reject(err)
     }
   }
}
module.exports = order;