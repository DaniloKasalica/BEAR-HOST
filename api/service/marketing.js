const Module = require('../model/model')


const marketing = {
  InsertIntoTable: async (doc) =>{
try{
  const sql= `
  INSERT INTO Marketing (
  Name,
  Firstcol,
  Secondcol,
  Thirdcol) VALUES ?
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
    SELECT MIN(Price_1) as price,
    ParentName, firstcol,secondcol,thirdcol
    FROM products
    JOIN marketing ON products.ParentName = marketing.Name
    GROUP BY ParentName;`
    const sql2 = `SELECT products.ParentName as parentname,products.Description_price as descriptionprice, t.price, t.firstcol,t.secondcol,t.thirdcol  
    FROM products, t 
    WHERE price_1 = t.price 
    GROUP BY ParentName;`
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
      if(firstcol){
     sql+=comma+`firstcol = '${doc.firstcol}'`
     comma = ','}
     if(firstcol){
    sql+=comma+`firstcol = '${doc.firstcol}'`
    comma = ','}
    if(firstcol){
   sql+=comma+`firstcol = '${doc.firstcol}'`
   comma = ','}
   if(firstcol){
  sql+=comma+`firstcol = '${doc.firstcol}'`
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