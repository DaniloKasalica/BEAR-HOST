const Module = require('../model/model')


const marketing = {
  InsertIntoTable: async (doc,PacketID) =>{
try{
  const sql= `
  INSERT INTO Marketing (
  Title,
  Description_1,
  Description_2,
  PacketID) VALUES ?
  `
   const result =  await Module.query(sql,[[[doc.title,doc.description1,doc.description2,PacketID]]])
  return Promise.resolve(result)
   }catch(err){
     return Promise.reject(err)
   }
},
FindMarketingProducts: async()=>{
  try{
    const sql = `CREATE TEMPORARY TABLE t
    SELECT MIN(Price_1) as minprice,
    Title ,Marketing.MarketingID, Marketing.Description_1 ,Marketing.Description_2, Marketing.PacketID
    FROM Products
    JOIN Marketing ON Products.PacketID = Marketing.PacketID
    GROUP BY Title;`
    const sql2 = `SELECT t.Title as title,products.Description_price as pricedescription,
    t.MinPrice as minprice, t.Description_1 as description1,t.Description_2 as description2 ,t.MarketingID as id
    FROM products, t
    WHERE price_1 = t.MinPrice AND products.PacketID = t.PacketID
    GROUP BY title`
    const sql3 = `DROP TABLE t`
     await Module.query(sql)
    const result =  await Module.query(sql2)
     await Module.query(sql3)
    return Promise.resolve(result)
  }catch(err){
    return Promise.reject(err)
  }
},
UpdateMarketingByID: async(ID,doc)=>{
  try{
    let sql = `UPDATE Marketing
     SET `
     let comma = ''
      if(doc.title){
     sql+=comma+`title = '${doc.title}' `
     comma = ','}
    if(doc.description1){
    sql+=comma+`Description_1 = '${doc.description1}' `
    comma = ','}
    if(doc.description2){
    sql+=comma+`Description_2 = '${doc.description2}' `
    comma = ','}
   sql+= ` WHERE PacketID = ${ID} `;
    const result  = await Module.query(sql);
    return Promise.resolve (result)
  }catch(err){
    return Promise.reject(err)
  }
}
}
module.exports = marketing;