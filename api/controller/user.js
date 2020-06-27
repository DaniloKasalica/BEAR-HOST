
const userService = require('../service/user')
const tokenService = require('../service/token')
const jwt = require('jsonwebtoken')
const user = {
    AddUser: async(req,res,next)=>{
       
       try{
      const person = await userService.InsertIntoTable(req.body.username,req.body.lastname,false, req.body.firstname, req.body.email, req.body.password);
      blockToken = jwt.sign({id:person.insertId},process.env.BLOCK_TOKEN, { expiresIn: '1d' });
      req.body.url = `http://localhost:3000/user/security/${blockToken}`
      req.params.id = person.insertId
      res.send({ID: person.insertId})
      next();
       }catch(err){
         res.status(400).send({error: err.message});
       }
    },
    login: async(req,res)=>{
      try{
        console.log(req.body.id)
      const accesToken = jwt.sign({id:req.body.id},process.env.ACCESS_TOKEN_USER, { expiresIn: '10m' });
      const refreshToken =  jwt.sign({id:req.body.id},process.env.REFRESH_TOKEN_USER)
      const result = await tokenService.InsertIntoTable(refreshToken)
      res.send({
        accesToken:accesToken,
        refreshToken: refreshToken
        })
      }catch(err){
        res.status(400).send({error:err.message})
      }
    },
    logout: async(req,res)=>{
      try{
      const refreshToken = req.body.token;
      if(refreshToken==null) 
      return res.sendStatus(400)
     const result = await tokenService.DeleteToken(refreshToken)
     res.status(200).send('Loged out ')
      }catch(err){
        res.status(400).send({error:err.message})
      }
    },
    refreshToken: async(req,res)=>{
      try{
      const refresToken = req.body.token
      if(refresToken==null) 
      return res.sendStatus(401)
      const result = await tokenService.FindToken(refresToken)
      jwt.verify(refresToken, process.env.REFRESH_TOKEN_USER, (err, user) => {
        if (err) 
        return res.sendStatus(403)
       const accessToken = jwt.sign({id: user.id}, process.env.ACCESS_TOKEN_USER, { expiresIn: '20m' })
        res.json({ accessToken: accessToken })
      })
    }catch(err){
      res.status(400).send({error:err.message})
    }
    },
    UpdateUser: async(req,res)=>{
      try{
        const result = await userService.UpdateByID(req.params.id,req.body)
        res.sendStatus(201)
      }catch(err){
        console.log(err)
        res.status(400).send({error:err.message})
      }
    },
    RessetPasswordRequest: async(req,res,next)=>{
      try{
      const result = await userService.FindByEmail(req.body.email)
      token =  jwt.sign({id:result.UserID},process.env.REFRESH_TOKEN_USER)
      const result1 = await tokenService.InsertIntoTable(refreshToken)
      req.body.url = `http://localhost:3000/user/security/resetpassword/${token}`
      next()
      }catch(err){
        res.sendStatus(400)
      }
    },
    RessetPassword: async(req,res)=>{
      const refreshtoken = req.params.tok
    }
    
}
module.exports = user;