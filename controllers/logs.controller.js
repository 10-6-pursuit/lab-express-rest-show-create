const express=require(`express`)
const logs=express.Router()
const logsData=require(`../models/log`)

logs.get(`/`,(req,res)=>{
    res.send(logsData)
})





module.exports=logs