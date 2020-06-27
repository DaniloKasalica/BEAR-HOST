const Module = require('../model/model')


const product = {
  InsertIntoTable: async (doc, packetID) =>{
try{
  const sql= `
  INSERT INTO Products (
  ProductName,
  PacketID,
  Price_1, Price_2, Price_3,
  Description_1,Value_1,
  Description_2,Value_2,
  Description_3,Value_3,
  Description_4,Value_4,
  Description_5,Value_5,
  Description_price) VALUES ?
  `
   const product = [[doc.productname,packetID,doc.price1,doc.price2,doc.price3,
                   doc.description1,doc.value1,doc.description2,doc.value2,doc.description3,doc.value3,
                   doc.description4,doc.value4,doc.description5,doc.value5,doc.pricedescription]];
   const result =  await Module.query(sql,[product])
  return Promise.resolve(result)
   }catch(err){
     return Promise.reject(err)
   }
},

DeleteProductByID : async(ID)=>{ 
   try{
  const sql = `DELETE FROM Products
  WHERE ProductID =${ID}`
  console.log(sql)
   const result = await Module.query(sql)
   if(result.affectedRows === 0){
   throw new Error('can not find product')
   }
   return Promise.resolve(true)
   }catch(err){
     return Promise.reject(err)
   }
},
UpdateProdByID: async(ID,doc)=>{
   try{
  let comma = ''
  let sql = `UPDATE Products SET `
   if(doc.price1){
  sql+= comma +` Price_1 =  ${doc.price1} `
  comma = ','
   }
  if(doc.price2){
  sql+= comma+`Price_2 = ${doc.price2} `
  comma = ','
  }
       if(doc.price3){
        sql+= comma +` Price_3 = '${doc.price3}' `
        comma = ','
       }
       if(doc.pricedescription){
       sql+=comma+ ` Description_price =  '${doc.pricedescription}' `
       comma = ','
       }
       if(doc.productname){
       sql+=comma+ ` ProductName =  '${doc.productname}' `
       comma = ','
       }
       if(doc.description1){
        comma = ','
       sql+= comma +` Description_1 ='${doc.description1}' `
       }
       if(doc.value1){
       sql+= comma + `  Value_1 = '${doc.value1}' `
       comma = ','
       }
       if(doc.description2){
        comma = ','
        sql+= comma +  ` Description_2 = '${doc.description2}' `
       }
       if(doc.value2){
       sql+=comma + ` Value_2 = '${doc.value2}' `
       comma = ','
       }
       if(doc.description3){
       sql+= comma +` Description_3 = '${doc.description3}' `
       comma = ','
       }
       if(doc.value3){
       sql+=comma + ` Value_3 = '${doc.value3}' `
       comma = ','
       }
       if(doc.description4){
       sql+= comma +` Description_4 =  '${doc.description4}' `
       comma = ','
       }
       if(doc.value4){
       sql+= comma +` Value_4 = '${doc.value4}' `
       comma = ','
       }
       if(doc.description5){
       sql+= comma+ ` Description_5 =' ${doc.description5}' `
       comma = ','
       }
       if(doc.value5){
       sql+= comma+` Value_5 = '${doc.value5}' `
       comma = ','
       }
      sql += `WHERE ProductID = '${ID}' `
      console.log(sql)
   const result = await Module.query(sql)
   return Promise.resolve(result)
   }catch(err){
     return Promise.reject(err)
   }
 },

FindPacketIDByMarketingID: async(ID)=>{
  try{
    const sql1 = `SELECT  PacketID as ID  FROM  Marketing WHERE  ${ID} = MarketingID`;
    const result = await Module.query(sql1);
    return Promise.resolve(result)
  }catch(err){
    return Promise.reject(err)
  }
},
FindPacketIDByPacketName: async(PacketName)=>{
  try{
   const sql = `SELECT PacketID as ID FROM Packets WHERE '${PacketName}'= PacketName`
   const result = await Module.query(sql)
   return Promise.resolve(result[0])
  }catch(err){
    return Promise.reject(err)

  }
},
FindProductsByPacketID: async(ID)=>{
  try{
    const sql2 = `SELECT ProductID as id,
    ProductName as productname,
    Price_1 as price1, Price_2 as price2, price_3 as price3,
    Description_price as pricedescription,
    Description_1 as description1,
    Value_1 as value1,
    Description_2 as description2,
    Value_2 as value2,
    Description_3 as description3,
    Value_3 as value3,
    Description_4 as description4,
    Value_4 as value4,
    Description_5 as description5,
    Value_5 as value5
    FROM Products WHERE ${ID} = PacketID `
    const result = await Module.query(sql2)
    return Promise.resolve(result)

  }catch(err){
    return Promise.reject(err)
  }
},
FindAllProducts: async()=>{
  try{
    const sql2 = `SELECT ProductID as id,
    ProductName as productname,
    Price_1 as price1, Price_2 as price2, price_3 as price3,
    Description_price as pricedescription,
    Description_1 as description1,
    Value_1 as value1,
    Description_2 as description2,
    Value_2 as value2,
    Description_3 as description3,
    Value_3 as value3,
    Description_4 as description4,
    Value_4 as value4,
    Description_5 as description5,
    Value_5 as value5
    FROM Products  `
    const result = await Module.query(sql2)
    return Promise.resolve(result)

  }catch(err){
    return Promise.reject(err)
  }
}
}
module.exports = product;