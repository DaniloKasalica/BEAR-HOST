const Module = require('../model/model')


const order = {
  AddNewOrder: async (userID) =>{
try{
  console.log(userID)
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
    sql = `SELECT orderID, UserID, OrderTime,Pricepacket,email,ProductName,price_1,price_2,price_3
    FROM orders_view
    JOIN products ON orders_view.ProductID = products.ProductID
    WHERE OrderID = ${orderID}`
    const result = await Module.query(sql)
    return Promise.resolve(result)
    }catch(err){
      return Promise.reject(err)
    }

  },
   AddNewOrderProduct: async(orderID, productname,pricepacket)=>{
     try{
       const sql1 = `
       SELECT ProductID FROM Products WHERE productName = '${productname}'`
       const sql = `
       INSERT INTO order_products(
       OrderID,
       ProductID,
       PricePacket 
       ) VALUES ?`
       const result1 = await Module.query(sql1)
       console.log(result1[0].ProductID)
       productID = result1[0].ProductID
       const result = await Module.query(sql,[[[orderID,productID,pricepacket]]])
       return Promise.resolve(result)
     }catch(err){
       return Promise.reject(err)
     }
   }
}
module.exports = order;