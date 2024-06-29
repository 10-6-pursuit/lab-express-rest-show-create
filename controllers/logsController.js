const express = require("express");
const logs = express.Router();
let logsArray = require("../models/log.js");

logs.get("/", (req,res) => {
    res.json(logsArray);
})

logs.get("/:id", (req, res) => {
    const { id } = req.params;
    const log = logsArray.find((log) => log.id === Number(id));
    if (log) {
      res.send(log);
    } else {
      res.send("Yo my man, we can't find this id: " + id);
    }
  });

logs.post("/", (req, res) => {
    const newLog = { ...req.body, id: logsArray.length + 1};
    logsArray.push(newLog);
    res.json(logsArray[logsArray.length - 1]);
})

module.exports = logs;