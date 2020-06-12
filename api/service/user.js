const Module = require('../model/model')


const user = {
  InsertIntoTable: async (username,lastname,status,firstname,email,password) =>{
try{
  const sql= `INSERT INTO Users (Username,LastName,IsActive, FirstName, Email, Password)
   VALUES ?`
   const person = [[username,lastname,status, firstname, email, password]];
   const result =  await Module.query(sql,[person])

  return Promise.resolve(result)
   }catch(err){
     return Promise.reject(err)
   }
},
FindByInsertId: async(insertId)=>{
  try{
    const sql = `SELECT * FROM Users WHERE ${insertId} = PersonID`
    const result = await Module.query(sql)
    return Promise.resolve(result)
  }catch(err){
    return Promise.reject(err)
  }
},
FindByEmail: async(email)=>{
  try{
    const sql = `SELECT * FROM Users WHERE Email = '${email}'`;
    const result = await Module.query(sql);

    return Promise.resolve(result[0])
  }catch(err){
    return Promise.reject(err)
  }
},
FindByUsername: async(username)=>{
  try{
    const sql = `SELECT * FROM Users  WHERE Username = '${username}'`
    const result = await Module.query(sql);
    return Promise.resolve(result[0])
  }catch(err){
    return Promise.resolve(err)
  }
},
UpdateActiveStatus: async(ID,val)=>{
  try{
  const sql = `UPDATE users SET IsActive = ${val} WHERE PersonID = ${ID }`
  const result = await Module.query(sql)
  if(result.affectedRows===0)
  throw new Error('cann not find admin username')
  return Promise.resolve(true)
  }catch(err){
    return Promise.reject(err)
     }
}

}

module.exports = user;