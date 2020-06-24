const Module = require('../model/model')


const comments = {
  InsertIntoTable: async (doc,PacketID) =>{
try{
  const sql= `
  INSERT INTO Comments (
  Grade,
  Comment,
  Job,
  Name) VALUES ?
  `
   const result =  await Module.query(sql,[[[doc.grade,doc.comment,doc.job,doc.name]]])
   return Promise.resolve(result)
   }catch(err){
     return Promise.reject(err)
   }
},
FindComments: async()=>{
  try{
    const sql = `SELECT 
    Grade as grade,
    Comment as comment, 
    Job as job,
    Name as name,
    CommentID as commentid
    FROM Comments;`
     const result = await Module.query(sql)
    return Promise.resolve(result)
  }catch(err){
    return Promise.reject(err)
  }
},
UpdateCommentsByID: async(ID,doc)=>{
  try{
    let sql = `UPDATE Comments
     SET `
     let comma = ''
      if(doc.grade){
     sql+=comma+`Grade = '${doc.grade}' `
     comma = ','}
    if(doc.comment){
    sql+=comma+`Comment = '${doc.comment}' `
    comma = ','}
    if(doc.job){
    sql+=comma+`Job = '${doc.job}' `
    comma = ','}
    if(doc.name){
      sql+=comma+`Name = '${doc.name}'`
      comma = ','
    }
   sql+= ` WHERE CommentID = ${ID} `;
    const result  = await Module.query(sql);
    return Promise.resolve (result)
  }catch(err){
    return Promise.reject(err)
  }
}
}
module.exports = comments;