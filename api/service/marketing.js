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
FindAllPackets: async()=>{
  try{
    const sql = `Select PacketID as packetid, 
    PacketName as packetname
    FROM Packets`
     const result = await Module.query(sql)
    return Promise.resolve(result)
  }catch(err){
    return Promise.reject(err)
  }
},
FindMarketingProducts: async()=>{
  try{
    const sql = `SELECT MIN(Price_1) as minprice,
    Title as title,products.Description_price pricedescription,
    Marketing.Description_1 as description1,Marketing.Description_2 as description2,
    Marketing.PacketID as packetid,Marketing.MarketingID as marketingid
    FROM Products
    JOIN Marketing ON Products.PacketID = Marketing.PacketID
    GROUP BY Title;`
     const result = await Module.query(sql)
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