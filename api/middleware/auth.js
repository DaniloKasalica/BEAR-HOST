require('dotenv').config()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../service/user');

const authuser = {
encpassword : async function (req,res,next){
    try {
    const password = await bcrypt.hash(req.body.password, 10);
    req.body.password = password;
    next()
    }
    catch(err){
        res.status(500).send({error: err.message})
    }
},
login : async(req,res,next)=>{
  try{
  const checkuser =await userService.FindByEmail(req.body.email)
  if(checkuser == null || undefined){
      return res.status(400).send({error: 'cannot find user'});
  }
         req.body.insertId = checkuser.PersonID;
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

  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,response)=>{
    if(err)
    res.sendStatus(403)
    req.params.insertId = response;
    next()
  })
}
}
const authadmin = {
  login : async(req,res,next)=>{
  try{
  const checkuser =await userService.FindByUsername(req.body.username)
  console.log(checkuser)
  if(checkuser == null || undefined){

      return res.status(400).send({error: 'cannot find user'});
  }
  if(checkuser.Status===0)
  return res.status(400).send({error: 'Admin status 0'})
         const resp = await bcrypt.compare(req.body.password, checkuser.Password);
         if(resp){
          req.body.insertId = checkuser.PersonID;
          next()
         }
         else {
          req.body.insertId = checkuser.PersonID;
          req.body.blockAdmin = process.env.BLOCK_SECRET
          const accesToken = jwt.sign({username:req.body.username},process.env.ACCESS_TOKEN_SECRET);
          req.body.url = `http://www.http//localhost:3000/admin/security/${accesToken}`
          res.status(400).send({error: 'Incorect password'})
          next()
        }
      } catch(err) {
        res.status(500).send({error: err.message})
      }
},
authenticateTokenAdmin : async (req,res,next)=>{
  const authHeader = req.params.token// Bearer TOKEN
  const token  =authHeader && authHeader.split(' ')[1]
  if(token == null) return res.sendStatus(401)

  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,response)=>{
    if(err)
    res.sendStatus(403)
    req.body.username = response[0]
    req.body.password = response[1]
    next()
  })
}
}


module.exports= {
  authadmin,
  authuser
}