const express = require("express");
const logs = express.Router();
const logsArray = require("../models/log");


//INDEX
logs.get("/", (req, res) => {
    res.status(200).send(logsArray);
});

//CREATE
logs.post("/", (req, res) => {
    const incomingLog = {...req.body};
    logsArray.push(incomingLog);
    res.status(201).send(logsArray[logsArray.length - 1]);
});

//DELETE
logs.delete("/:id", (req, res) => {
    const { id } = req.params;
    const indexToDelete = logsArray.findIndex(log => log.id === +id);
    if(indexToDelete !== -1){
        logsArray.splice(indexToDelete, 1);
        res.redirect("/logs");
    } else {
        res.status(404).send({error404: `${id} Not Found`});
    };
});

//PUT
logs.put("/:id", (req, res) => {
    const { id } = req.params;
    const indexToUpdate = logsArray.findIndex(log => log.id === +id);
    if(indexToUpdate !== -1){
        logsArray[indexToUpdate] = {...logsArray[indexToUpdate], ...req.body}
        res.json(logsArray[indexToUpdate]);
    } else {
        res.status(404).send({error404: `${id} Not Found`});
    };
});

//SHOW
logs.get("/:index", (req, res) => {
    const { index } = req.params;
    if(index > logsArray.length){
        res.redirect("/logs/not-found");
    } else {
        res.status(200).json(logsArray[index]);
    }
});

module.exports = logs;