require('dotenv').config()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../service/user');

const authuser = {
encpassword : async function (req,res,next){
    try {
      if(req.body.password){
    const password = await bcrypt.hash(req.body.password, 10)
    req.body.password = password
    next()
      }else{
      next()
      }
    }
    catch(err){
        res.status(500).send({error: err.message})
    }
},
login : async(req,res,next)=>{
  try{
    let checkuser 
     if(req.body.username)  {
       checkuser =await userService.FindByUsername(req.body.username)

    }
    else if(req.body.email){
       checkuser = await userService.FindByEmail(req.body.email)
    }

    if(checkuser == null ){
        return res.status(400).send({error: 'cannot find user'});
       }
  if(checkuser.IsActive==false)
  return res.status(403).send({error: 'User status false'})
         req.body.id = checkuser.UserID;
         const resp = await bcrypt.compare(req.body.password, checkuser.Password);
         if(resp){
          next()
         }
         else {
          res.status(400).send({error: 'Incorect password'})
        }
      } catch(err) {
        res.status(500).send({error: err.message})
      }
},
authenticateToken : async (req,res,next)=>{
  const authHeader = req.headers['authorization']// Bearer TOKEN
  const token  =authHeader && authHeader.split(' ')[1]
  if(token == null) return res.sendStatus(401)

  jwt.verify(token,process.env.ACCESS_TOKEN_USER, (err,response)=>{
    if(err)
    res.sendStatus(401)/3
    req.params.id = response.id;
    next()
  })
},
authenticateResetPasswordToken:  (req,res,next)=>{
  const token = req.body.token// Bearer TOKEN
  if(token == null) return res.sendStatus(401)
  jwt.verify(token,process.env.RESET_PASSWORD_TOKEN, async (err,response)=>{
    if(err){
    res.sendStatus(403)
    }
    req.params.id = response.id
    next()
  })
},
authenticateBlockToken :  (req,res,next)=>{
  const token = req.params.token// Bearer TOKEN
  if(token == null) return res.sendStatus(400)
  jwt.verify(token,process.env.BLOCK_TOKEN, async (err,response)=>{
    if(err){
    res.status(403)
    }
    const result =  await userService.UpdateActiveStatus(response.id,true)
    res.redirect('https://localhost:3000/login')
    next()
  })
}
}
const authadmin = {
  login : async(req,res,next)=>{
  try{
    let checkuser 
     if(req.body.username)  {
       checkuser =await userService.FindByUsername(req.body.username)
    }
    else if(req.body.email){
       checkuser = await userService.FindByEmail(req.body.email)
    }

  if(checkuser == null)
   res.status(400).send({error: 'cannot find user'});
  if(checkuser.Role !==1)
  res.status(403).send({error: 'ROLE: 0'})
  if(checkuser.IsActive==false)
  res.status(403).send({error: 'Admin status 0'})
  const resp = await bcrypt.compare(req.body.password, checkuser.Password);
         req.body.id = checkuser.UserID;
         if(resp){
          next()
         }
         else {
          req.body.blockAdmin = process.env.BLOCK_SECRET
          res.status(400).send({error: 'Incorect password'})
          next()
        }
      } catch(err) {
        res.status(500).send({error: err.message})
      }
},
authenticateBlockToken : async (req,res,next)=>{
  const token = req.params.token// Bearer TOKEN
  if(token == null) return res.sendStatus(400)
  jwt.verify(token,process.env.ACCESS_TOKEN_ADMIN, async (err,response)=>{
    if(err || response.role !== 1)
    res.sendStatus(403)
    const result = await userService.UpdateActiveStatus(response.id,true)
    next()
  })
},
authenticateToken : async (req,res,next)=>{
  const authHeader = req.headers['authorization']// Bearer TOKEN
  const token  =authHeader && authHeader.split(' ')[1]
  if(token == null) return res.sendStatus(401)
  
  jwt.verify(token,process.env.ACCESS_TOKEN_ADMIN, (err,response)=>{
    if(err || response.role !== 1)
    res.sendStatus(401)
    req.params.id = response.id;
    next()
  })
}
}


module.exports= {
  authadmin,
  authuser
}