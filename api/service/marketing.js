const Module = require('../model/model')


const marketing = {
  InsertIntoTable: async (arr) =>{
try{
  const sql= `
  INSERT INTO Marketing (
  ProductName,
  ParentName,
  Price_1, Price_2, Price_3,
  Description_1,Value_1,
  Description_2,Value_2,
  Description_3,Value_3
  Description_4,Value_4,
  Description_5,Value_5,
  Description_price) ?
  `
   const person = [[prodname,parname,price1,price2,price3,des1,val1,des2,val2,des3,val3,des4,val4,des5,val5,pricedes]];
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
UpdateByName: async(name, firstcol, secondcol, thirdcol, fourthcol)=>{
  try{
    const sql = `UPDATE Products
     SET firstcol = '${firstcol}',
          secondtcol = '${secondcol}',
          thirdcol = '${thirdcol}',
          fourthcol = '${fourthcol}'
     WHERE Name = ${name}`;
    const result  = await Module.query(sql);
    return Promise.resolve (result)
  }catch(err){
    return Promise.rejecet(err)
  }
}
}
module.exports = marketing;