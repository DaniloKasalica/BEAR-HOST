const userService = require('../service/user')
const tokenService = require('../service/token')
const jwt = require('jsonwebtoken')
const admin = {
    login: async(req,res,next)=>{
      try{
        if(req.body.blockAdmin == process.env.BLOCK_SECRET){
        const accesToken = jwt.sign({id:req.body.id},process.env.ACCESS_TOKEN_BLOCK);
        req.body.url = `http://localhost:3000/admin/security/${accesToken}`
       const result = await userService.UpdateAdminStatus(req.body.Id ,false)
       next()
      }
      const accesToken = jwt.sign({id: req.body.id,role:1},process.env.ACCESS_TOKEN_ADMIN, { expiresIn: '15m' });
      const refreshToken =  jwt.sign({id: req.body.id,role:1},process.env.REFRESH_TOKEN_ADMIN)
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
      return res.sendStatus(401)
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
      jwt.verify(refresToken, process.env.REFRESH_TOKEN_ADMIN, (err, user) => {
        if (err || user.role !==1) 
        return res.sendStatus(403)
       const accessToken = jwt.sign({id: user.id,role:1}, process.env.ACCESS_TOKEN_ADMIN, { expiresIn: '15s' })
        res.json({ accessToken: accessToken })
      })
    }catch(err){
      res.status(400).send({error:err.message})
    }
    }
}
module.exports = admin;