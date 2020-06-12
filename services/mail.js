const nodemailer = require('nodemailer');
const ObjectsToCsv = require('objects-to-csv');
const adminService = require('../api/service/user');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

require('dotenv').config();


const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
     user: process.env.EMAIL,
     pass: process.env.PASSWORD
   }
 });
 class mailOptionsobjNewProduct {
     
   constructor(mail,filepath){
       this.to = mail;
       this.text = 'New prod';
       this.from = 'danilo.kasalica@gmail.com';
       this.subject = 'New Product';
       this.attachments = {
           path: filepath
       }
   };
 };
 class mailOptionsobjBlocAdmin {
     
   constructor(mail,accestoken){
       this.to = mail;
       this.html = `<h1>Please comfirmirm your acount, and change pass and username<h1><a href =${accestoken}>Click here</a>`;
       this.from = 'danilo.kasalica@gmail.com';
       this.subject = 'SECURITY';
   };
 };
    class mailOptionsobjBlocUser {
     
  constructor(mail,accestoken){
      this.to = mail;
      this.html = `<h1>Please comfirmirm your acount<h1><a href =${accestoken}>Click here</a>`;
      this.from = 'danilo.kasalica@gmail.com';
      this.subject = 'SECURITY';
  };
};
 const writecsvfile = async (doc)=>{
   const csv = new ObjectsToCsv([doc]);
   return  await csv.toDisk(__dirname+'/order.csv')
 }



 const newprodinfo = async(doc) =>{ 
     try{
      await writecsvfile(doc)
     const arr = (await adminService.searchadmin(doc)).map(elem =>{
         return elem.email;
     })
     const path =__dirname+ '/product.csv'
     const mailOptions = new mailOptionsobjNewProduct(arr,path)
     await transporter.sendMail(mailOptions)
     return Promise.resolve(true)
    }catch(error){
        return Promise.reject(error)
    }

}
const blockAdmin = (email,url) =>{
    const mailOptions = new mailOptionsobjBlocAdmin(email,url)
     transporter.sendMail(mailOptions,(err,info)=>{
         if(err) 
         return Promise.reject(err)
         return Promise.resolve(info)
     })
}
const blockUser = (email,url)=>{
  const mailOptions = new mailOptionsobjBlocUser(email,url)
  transporter.sendMail(mailOptions,(err,info)=>{
    if(err)
    return Promise.reject(err)
    return Promise.resolve(info)
  })
}
module.exports = {
   blockUser,
   newprodinfo,
   blockAdmin
}