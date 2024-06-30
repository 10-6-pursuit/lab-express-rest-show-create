const express=require(`express`)
const logs=express.Router()
let logsData=require(`../models/log`)

logs.use((req,res,next)=>{
  console.log(typeof req.body.captainName)
  if(req.method===`POST`){
    if(typeof req.body.id===`number`&&typeof req.body.captainName===`string`&&typeof req.body.post===`string`&&typeof req.body.mistakesWereMadeToday===`boolean`&&typeof req.body.daysSinceLastCrisis===`number`){
      return next()
    }
    else res.send({error:`wrong data type`})
  }
  else return next()
 

})

logs.get(`/`,(req,res)=>{
    const order=req.query.order;
    const mistake=req.query.mistake;
    const {lastCrisis}=req.query
    let strLastCrisis;
    let numLastCrisis
    if(lastCrisis){
       strLastCrisis=lastCrisis.match(/[a-zA-Z]/gi).join(``)
     numLastCrisis=lastCrisis.match(/[0-9]/gi).join(``)
      console.log(numLastCrisis)

    }
    
    
    if(order===`asc`){
        logsData.sort((a, b) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
          });
        
    }
    
    if(order===`desc`){
        logsData.sort((a, b) => {
            if (b.title < a.title) return -1;
            if (b.title > a.title) return 1;
            return 0;
          });
        
    }
   
    // if(mistake===`true`){
    //   let filteredArray=
    //     logsData=logsData.filter(el=>el.mistakesWereMadeToday===true)
        
    // }
    // if(mistake===`false`){
    //     logsData=logsData.filter(el=>el.mistakesWereMadeToday===false)}
        
    // }
    // if(strLastCrisis===`gt`){
    //   console.log(`gt`,strLastCrisis,numLastCrisis)
      
    //     logsData=logsData.filter(el=>el.daysSinceLastCrisis>Number(numLastCrisis))
        
    // }
    // if(strLastCrisis===`gte`){
    //     logsData=logsData.filter(el=>el.daysSinceLastCrisis>=Number(numLastCrisis))
        
    
    
    
    
     res.send(logsData)

    
})
logs.get(`/:id`,(req,res)=>{
  const id=req.params.id
  
  const log=logsData[id]
  console.log(log)
  if(log){
    res.send(log)

  }else res.redirect(`/`)
})
logs.post(`/`,(req,res)=>{
  logsData.push({...req.body})
  res.send(logsData)
 
})
logs.put(`/:id`,(req,res)=>{
  const id=req.params.id;
  const index=logsData.findIndex(el=>el.id==id)
  if(index!==-1){logsData[index]={...logsData[index],...req.body}
  res.redirect(`/logs`)}
  else res.status(404).send({error:`there is no element with this id`})
  
 
})
logs.delete(`/:id`,(req,res)=>{
  const id=req.params.id;
  const index=logsData.findIndex(el=>el.id==id)
  if(index!==-1){
   logsData.splice(index,1)
  res.redirect(`/logs`)}
  else res.status(404).send({error:`there is no element with this id`})
  
 
})





module.exports=logs