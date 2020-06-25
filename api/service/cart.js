const Module = require('../model/model')


const cart = {
  AddNewCart: async (userID) =>{
try{
  const sql= `INSERT INTO Cart (UserID)
  VALUES (${userID})`
   const result =  await Module.query(sql)
   return Promise.resolve(result)
   }catch(err){
     return Promise.reject(err)
   }
  },
  SelectCarts: async(orderID)=>{
    try{
    sql = `SELECT cartID, UserID, OrderTime,Pricepacket,email,ProductName,price_1,price_2,price_3
    FROM orders_view
    JOIN products ON orders_view.ProductID = products.ProductID
    WHERE OrderID = ${orderID}`
    const result = await Module.query(sql)
    return Promise.resolve(result)
    }catch(err){
      return Promise.reject(err)
    }

  },
   AddNewCartProduct: async(cartID, productID,pricepacket)=>{
     try{
       const sql = `
       INSERT INTO cart_products(
       CartID,
       ProductID,
       PricePacket 
       ) VALUES ?`
       const result = await Module.query(sql,[[[cartID,productID,pricepacket]]])
       return Promise.resolve(result)
     }catch(err){
       return Promise.reject(err)
     }
   }
}
module.exports = cart;