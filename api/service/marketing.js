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
    const sql = `SELECT * FROM Marketing`
    const result = await Module.query(sql)
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