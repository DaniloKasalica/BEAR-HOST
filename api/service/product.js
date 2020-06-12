const Module = require('../model/model')


const product = {
  InsertIntoTable: async (firstcol,secondcol,thirdcol,fourthcol) =>{
try{
  const sql= `INSERT INTO Users (firstcol, secondcol, thirdcol, fourthcol )
   VALUES ?`
   const person = [[lastname, firstname, email, password]];
   const result =  await Module.query(sql,[person])

  return Promise.resolve(result)
   }catch(err){
     return Promise.reject(err)
   }
},
FindbyID: async(Id)=>{
  try{
    const sql = `SELECT * FROM Products WHERE ${Id} = ProductID`
    const result = await Module.query(sql)
    return Promise.resolve(result)
  }catch(err){
    return Promise.reject(err)
  }
},
Update: async(id, firstcol, secondcol, thirdcol, fourthcol)=>{
  try{
    const sql = `UPDATE Products SET firstcol = '${firstcol}' SET secondtcol = '${secondcol}'
                 SET thirdcol = '${thirdcol}' SET fourthcol = '${fourthcol}'
                 WHERE ProductID = ${id}`;
    const result  = await Module.query(sql);
    return Promise.resolve (result)
  }catch(err){
    return Promise.rejecet(err)
  }
}
}
module.exports = user;