const nodemailer = require('nodemailer');
const ObjectsToCsv = require('objects-to-csv');
const adminService = require('../api/service/user');
const { FindByEmail } = require('../api/service/user');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

require('dotenv').config();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

const contact = async(doc) =>{ 
  try{
  const mailOptions = new mailOptionsobjContact(doc,process.env.EMAIL)
  await transporter.sendMail(mailOptions)
  return Promise.resolve(true)
 }catch(error){
   console.log(error)
     return Promise.reject(error)
 }
}
const newprodinfo = async(doc) =>{ 
  try{
   await writecsvfile(doc)
  const path =__dirname+ '/order.csv'
  const mailOptions = new mailOptionsobjNewOrder(process.env.EMAIL,path,process.env.EMAIL)
  await transporter.sendMail(mailOptions)
  return Promise.resolve(true)
 }catch(error){
     return Promise.reject(error)
 }
}
const resetpassword =  async (email,url)=>{
  const mailOptions = new mailOptionsobjRessetPass(email,url,process.env.EMAIL)
  transporter.sendMail(mailOptions,(err,info)=>{
    if(err) 
     return Promise.reject(err)
     return Promise.resolve(info)
})
}
const blockAdmin = (email,url) =>{
 const mailOptions = new mailOptionsobjBlocAdmin(email,url,process.env.EMAIL)
  transporter.sendMail(mailOptions,(err,info)=>{
      if(err) 
      return Promise.reject(err)
      return Promise.resolve(info)
  })
}
const blockUser = (email,url,name)=>{
const mailOptions = new mailOptionsobjBlocUser(email,url,name,process.env.EMAIL)
transporter.sendMail(mailOptions,(err,info)=>{
 if(err){
  console.log(err + 'dsadsadsadsa')
 return Promise.reject(err)
 }
 return Promise.resolve(info)
})
}
class mailOptionsobjRessetPass{
  constructor(mail,url,from){
    this.to = mail;
    this.html = `<h1>Please comfirmirm your acount, and add new password<h1><a href =${url}>Click here</a>`;
    this.from = from;
    this.subject = 'SECURITY';
};
}
class mailOptionsobjNewOrder {
    
  constructor(mail,filepath,from){
      this.to = mail;
      this.text = 'New prod';
      this.from = from;
      this.subject = 'New Product';
      this.attachments = {
          path: filepath
      }
  };
};
class mailOptionsobjContact{
  constructor(doc,email){
    this.to = email;
    this.html =`<h1>Korisnik ${doc.name} </h1> <p>${doc.message} </p>` ;
    this.from = ` ${doc.email} <${email}>`;
    this.subject = `${doc.subject}`
}
}
 class mailOptionsobjBlocAdmin {
     
   constructor(mail,url,from){
       this.to = mail;
       this.html = `<h1>Please comfirmirm your acount, and change pass and username<h1><a href =${url}>Click here</a>`;
       this.from = from;
       this.subject = 'SECURITY';
   };
 };
    class mailOptionsobjBlocUser {
     
  constructor(mail,url,name,from){
      this.to = mail;
      this.html = `<h1>${name} Please comfirmirm your acount<h1><a href =${url}>Click here</a>`;
      this.from = from;
      this.subject = 'SECURITY';
  };
};
 const writecsvfile = async (doc)=>{
   const csv = new ObjectsToCsv(doc);
   return  await csv.toDisk(__dirname+'/order.csv')
 }


module.exports = {
   blockUser,
   newprodinfo,
   blockAdmin,
   resetpassword,
   contact
}