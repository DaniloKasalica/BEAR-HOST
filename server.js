const express = require('express');
const { json, urlencoded } = require('body-parser')
const app = express()
const userRoutes = require('./api/routes/user')
const adminRoutes = require('./api/routes/admin')
const sendmail  = require('./services/mail')



app.use(urlencoded({ extended: true }));
app.use(json());




app.use('/user',userRoutes);
app.use('/admin',adminRoutes)
//app.use('/order')
app.post('/admin/login', async(req,res)=>{
    console.log(req.body.url)
    if(req.body.blockAdmin === process.env.BLOCK_SECRET){
        try{
            const result = await sendmail.blockAdmin(req.body.email,req.body.url)
        }catch(err){
            console.log(err.message)
        }
    }
})

app.listen(3000);

