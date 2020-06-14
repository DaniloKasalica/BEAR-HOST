const express = require('express');
const { json, urlencoded } = require('body-parser')
const userRoutes = require('./api/routes/user')
const adminRoutes = require('./api/routes/admin')
const sendmail  = require('./services/mail')
const productRoutersAdmin = require('./api/routes/productadmin')


const app = express()
app.use(urlencoded({ extended: true }));
app.use(json());

app.use('/user',userRoutes);
app.use('/admin',adminRoutes)
app.use('/admin/product',productRoutersAdmin)
//app.use('/order')
app.post('/user/signup',async(req,res)=>{
    try{
        const result = await sendmail.blockUser(req.body.email, req.body.url,req.body.firstname)

    }catch(err){
        console.log(err)
    }
})
app.post('/admin/login', async(req,res)=>{
    
    if(req.body.blockAdmin === process.env.BLOCK_SECRET){
        try{
            const result = await sendmail.blockAdmin(req.body.email,req.body.url)
        }catch(err){
            console.log(err.message)
        }
    }
})

app.listen(3000);

