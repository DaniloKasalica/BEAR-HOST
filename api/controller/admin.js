const userService = require('../service/user')
const tokenService = require('../service/token')
const jwt = require('jsonwebtoken')
const adminauth = {
    login: async(req,res,next)=>{
      try{
        if(req.body.blockAdmin == process.env.BLOCK_SECRET){
        const accesToken = jwt.sign({id:req.body.id},process.env.ACCESS_TOKEN_SECRET);
        req.body.url = `http://localhost:3000/admin/security/${accesToken}`
       const result = await userService.UpdateAdminStatus(req.body.Id ,false)
       next()
       return;
      }
      const accesToken = jwt.sign({id: req.body.id},process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
      const refreshToken =  jwt.sign({id: req.body.id},process.env.REFRESH_TOKEN_SECRET)
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
      jwt.verify(refresToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) 
        return res.sendStatus(403)
       const accessToken = jwt.sign({id: user.id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
        res.json({ accessToken: accessToken })
      })
    }catch(err){
      res.status(400).send({error:err.message})
    }
    }
}
module.exports = adminauth;