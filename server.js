const express = require('express');
const { json, urlencoded } = require('body-parser')
const userRoutes = require('./api/routes/user')
const adminRoutes = require('./api/routes/admin')
const sendmail  = require('./services/mail')
const productRoutersAdmin  = require('./api/routes/productsadmin')
const commentRoutersAdmin = require('./api/routes/commentsadmin.js')
const commentRoutersUser = require('./api/routes/commentsuser')
const orderRouters = require('./api/routes/order')
const productRoutersUser = require('./api/routes/productuser')
const cartRouters = require('./api/routes/cart')
const app = express()
app.use(urlencoded({ extended: true }));
app.use(json());

app.use('/admin',adminRoutes);
app.use('/admin/products',productRoutersAdmin);
app.use('/admin/comments',commentRoutersAdmin)

app.use('/user',userRoutes);
app.use('/order',orderRouters)
app.use('/cart',cartRouters)
app.use('/products',productRoutersUser)
app.use('/comments',commentRoutersUser)
app.post('/order/:CartID', async(req,res)=>{
    try{
        console.log(req.body.orders)
        const result = await sendmail.newprodinfo(req.body.orders)
    }catch(err){
        console.log(err)
    }
})
/*app.post('/user/signup',async(req,res)=>{
    try{
        const result = await sendmail.blockUser(req.body.email, req.body.url,req.body.firstname)

    }catch(err){
        console.log(err)
    }
})*/
app.post('/admin/login', async(req,res)=>{
    
    if(req.body.blockAdmin === process.env.BLOCK_SECRET){
        try{
            const result = await sendmail.blockAdmin(req.body.email,req.body.url)
        }catch(err){
            console.log(err)
        }
    }
})
app.post('/security/password', async(req,res)=>{
    try{
        const result = await sendmail.resetpassword(req.body.email,req.body.url)
    }catch(err){
        console.log(err)
    }
})

app.listen(3000);

