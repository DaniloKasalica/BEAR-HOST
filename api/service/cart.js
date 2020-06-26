const Module = require('../model/model')
const product = require('./product')


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
  FindUserCartsByUserID: async(userID)=>{
    try{
      const sql = `SELECT CartID as cartid
      FROM cart
      WHERE cart.userID =${userID}`
       const result = await Module.query(sql)
       const sql1 = `SELECT  Products.ProductID as productid, ProductName as productname, Price_1 as price1, Price_2 as price2, Price_3 as price3,
       Description_price as pricedescription, Description_1 as description1, Value_1 as value1, CartId as cartid, PricePacket as pricepacket
       FROM products
       JOIN cart_products ON cart_products.ProductID = products.productID
       WHERE cart_products.CartID =${result[0].cartid}`
       const products = await Module.query(sql1)
       return Promise.resolve(products)
       }catch(err){
         return Promise.reject(err)
       }
  },
  FindCartsByUserID: async(userID)=>{
    try{
      const sql = `SELECT CartID as cartid
      FROM cart
      WHERE cart.userID =${userID}`
       const result = await Module.query(sql)
       return Promise.resolve(result)
       }catch(err){
         return Promise.reject(err)
       }
  },
  FindCartProducts: async(cartID,userID)=>{
    try{
      const sql = `SELECT  Products.ProductID as productid, ProductName as productname, Price_1 as price1, Price_2 as price2, Price_3 as price3,
      Description_price as pricedescription, Description_1 as description1, Value_1 as value1, CartId as cartid, PricePacket as pricepacket
      FROM products
      JOIN cart_products ON cart_products.ProductID = products.productID
      WHERE cart_products.CartID =${CartID}`
       const result = await Module.query(sql)
       return Promise.resolve(result)
       }catch(err){
         return Promise.reject(err)
       }
   
     },
     DeleteCart:async(cartID)=>{
      try{
        const sql = `DELETE FROM Cart_products
         WHERE CartID= ${cartID}`
         const sql2 = `DELETE FROM Cart WHERE CartID = ${cartID}`
         await Module.query(sql)
         await Module.query(sql2)
         return Promise.resolve(true)
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
       console.log(cartID,productID,pricepacket)
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