const express=require(`express`)
const app=express()
const logs=require(`./controllers/logs.controller`)
app.use(express.json())

app.use(`/logs`,logs)

app.get(`/`,(req,res)=>{
    res.send("welcome to the captain's log")
})

module.exports=app;