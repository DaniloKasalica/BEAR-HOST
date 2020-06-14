const Module = require('../model/model')


const product = {
  InsertIntoTable: async (arr) =>{
try{
  const sql= `
  INSERT INTO Products (
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
 UpdateProdByName: async(name,doc)=>{
   try{
  let comma = ''
  let sql = `UPDATE Products SET `
   if(doc.price1){
  sql+= comma +` Price_1 =  ${doc.price1}`
  comma = ','
   }
  if(doc.price2){
  sql+= comma+`Price_2 = ${doc.price2},`
  comma = ','
  }
       if(doc.price3){
        sql+= comma +` Price_3 = '${doc.price3}',`
        comma = ','
       }
       if(doc.descriptionPrice){
       sql+=comma+ ` Description_price =  '${doc.descriptionPrice}'`
       comma = ','
       }
       if(doc.description1){
        comma = ','
       sql+= comma +` Description_1 ='${doc.description1}'`
       }
       if(doc.value1){
       sql+= comma + `  Value_1 = '${doc.value1} '`
       comma = ','
       }
       if(doc.description2){
        comma = ','
        sql+= comma +  ` Description_2 = '${doc.description2}'`
       }
       if(doc.value2){
       sql+=comma + ` Value_2 = '${doc.value2}'`
       comma = ','
       }
       if(doc.description3){
       sql+= comma +` Description_3 = '${doc.description3}'`
       comma = ','
       }
       if(doc.value3){
       sql+=comma + ` Value_3 = '${doc.value3}'`
       comma = ','
       }
       if(doc.description4){
       sql+= comma +` Description_4 =  '${doc.description4}'`
       comma = ','
       }
       if(doc.value4){
       sql+= comma +` Value_4 = '${doc.value4}'`
       comma = ','
       }
       if(doc.description5){
       sql+= comma+ ` Description_5 =' ${doc.description5}'`
       comma = ','
       }
       if(doc.value5){
       sql+= comma+` Value_5 = '${doc.value5}'`
       comma = ','
       }
      sql += `WHERE ProductName = '${name}'`
   console.log(sql)
   const result = await Module.query(sql)
   return Promise.resolve(result)
   }catch(err){
     console.log(err)
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
module.exports = product;