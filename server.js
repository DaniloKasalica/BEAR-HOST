const express = require('express');
const { json, urlencoded } = require('body-parser')
const sendmail  = require('./services/mail')

const cors = require('cors')
const adminRoutes = require('./api/routes/admin')
const productRoutersAdmin  = require('./api/routes/productsadmin')
const commentRoutersAdmin = require('./api/routes/commentsadmin.js')
const orderRoutersAdmin = require('./api/routes/orderadmin')

const admin = express()
admin.use(cors())
admin.use(urlencoded({ extended: true }));
admin.use(json());
admin.use('/admin',adminRoutes);
admin.use('/admin/products',productRoutersAdmin);
admin.use('/admin/comments',commentRoutersAdmin)
admin.use('/admin/orders',orderRoutersAdmin)





const userRoutes = require('./api/routes/user')
const commentRoutersUser = require('./api/routes/commentsuser')
const orderRouters = require('./api/routes/order')
const productRoutersUser = require('./api/routes/productuser')
const cartRouters = require('./api/routes/cart')
const app = express()
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors())

app.use('/user',userRoutes);
app.use('/order',orderRouters)
app.use('/cart',cartRouters)
app.use('/products',productRoutersUser)
app.use('/comments',commentRoutersUser)







app.post('/contact',async(req,res)=>{
    try{
         await sendmail.contact(req.body)
         res.sendStatus(200)
    }catch(err){
        res.sendStatus(400)
    }
})
app.post('/order', async(req,res)=>{
    try{
        const result = await sendmail.newprodinfo(req.body.orders)

    }catch(err){
        console.log(err)
    }
})
app.post('/user/signup',async(req,res)=>{
    try{
        const result = await sendmail.blockUser(req.body.email,req.body.url,req.body.firstname)

    }catch(err){
        console.log(err)
    }
})
app.post('/user/security/password', async(req,res)=>{
    try{
        const result = await sendmail.resetpassword(req.body.email,req.body.url)
        res.sendStatus(200)
    }catch(err){
        console.log(err)
    }
})



admin.post('/admin/login', async(req,res)=>{
    
    if(req.body.blockAdmin === process.env.BLOCK_SECRET){
        try{
            const result = await sendmail.blockAdmin(req.body.email,req.body.url)
        }catch(err){
            console.log(err)
        }
    }
})



app.listen(3001)
admin.listen(3002)
