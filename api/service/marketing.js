const Module = require('../model/model')


const marketing = {
  InsertIntoTable: async (doc) =>{
try{
  const sql= `
  INSERT INTO Marketing (
  Title,
  Description_1,
  Description_2,
  PacketID) VALUES ?
  `
   const result =  await Module.query(sql,[[[doc.name,doc.firstcol,doc.secondcol,doc.thirdcol]]])
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
UpdateByName: async(name,doc)=>{
  try{
    let sql = `UPDATE Products
     SET`
     let comma = ''
      if(title){
     sql+=comma+`title = '${doc.Title}'`
     comma = ','}
    if(description_1){
    sql+=comma+`firstcol = '${doc.Description_1}'`
    comma = ','}
    if(description_2){
    sql+=comma+`description_2 = '${doc.Description_2}'`
    comma = ','}
   sql+= ` WHERE Name = ${name}`;
    const result  = await Module.query(sql);
    return Promise.resolve (result)
  }catch(err){
    return Promise.rejecet(err)
  }
}
}
module.exports = marketing;