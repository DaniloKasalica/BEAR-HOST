const productService = require('../service/product')
const tokenService = require('../service/token')
const marketingServic = require('../service/marketing')
const jwt = require('jsonwebtoken')
const product = {
    FindProductsByMarketingID: async(req,res)=>{
        try{
     const packet = await  productService.FindPacketIDByMarketingID(req.params.marketingID)
     const packetID = packet[0].ID
     const products = await productService.FindProductsByPacketID(packetID)
     res.status(200).send(products)
        }catch(err){
         res.status(400).send({error: err.message})
        }
    },
    FindProductsByPacketName: async(req,res) =>{
       try{
          const packet = await productService.FindPacketIDByPacketName(req.params.PacketName)
          const packetID = packet.ID
          const products = await productService.FindProductsByPacketID(packetID)
          res.status(200).send(products)
          
       }catch(err){
          res.status(400).send({error:err.message})
       }
    },
    FindProductsByPacketID: async(req,res)=>{
       try{
          const products = await productService.FindProductsByPacketID(req.params.PacketID)
          res.status(200).send(products)
       }catch(err){
          res.sendStatus(400)
       }
    },
    FindMarketingProducts: async(req,res)=>{
       try{
          const result = await marketingServic.FindMarketingProducts()
          res.status(200).send(result)
       }catch(err){
          res.status(400).send({error: err.message})
       }
    },
    FindPackets: async(req,res)=>{
       try{
          const result  = await marketingServic.FindAllPackets()
          res.status(200).send(result)
       }catch(err){
          res.status(400).send({error: err.message})
       }
       }
 }
 module.exports = product;