const express = require("express");
const router = express.Router();
const captainsData = require("../models/log")
const { nanoid } = require("nanoid")

router.get("/", (req,res) => {
    res.send("Welcome to the captain's log")
})

router.get("/logs", (req,res) => {
    res.send(captainsData)
})

router.get("/:id",(req,res) => {
    const { id } = req.params;
    if(captainsData[id]){
        res.send(captainsData[id])
    } else {
        res.redirect("/logs")
    }
})

router.post("/", (req, res) => {
    const newCaptainLog = {...req.body}
    captainsData.push(newCaptainLog)

    res.status(201).send(newCaptainLog)
})

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const logToDeleteIndex = captainsData.findIndex(ele => ele.id == id)
  
    if (logToDeleteIndex !== -1) {
      captainsData.splice(logToDeleteIndex, 1)
      res.redirect("/logs")
    } else {
      res.status(404).send({error: `Transaction with id: ${id} not found!`})
    }
  })

module.exports = router;