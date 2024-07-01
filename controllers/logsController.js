const express = require("express");
const logs = express.Router();
let logsArray = require("../models/log.js");

logs.get("/", (req,res) => {
    res.json(logsArray);
})

logs.get("/:arrayIndex", (req, res) => {
    const { arrayIndex } = req.params;
    const log = logsArray[arrayIndex]           // ((log) => log.id === Number(id));
    if (log) {
      res.send(log);
    } else {
      res.redirect("./logs");
    }
  });

  

logs.post("/", (req, res) => {
    const currentLog = { ...req.body};
    logsArray.push(currentLog);
    res.json(logsArray[logsArray.length - 1]);
})

logs.delete("/:id", (req, res) => {
    const { id } = req.params;
    const deletedLogIndex = logsArray.findIndex(
      (log) => log.id === Number(id)
    );
    if (deletedLogIndex !== -1) {
      const deletedColor = logsArray.splice(deletedLogIndex, 1);
      res.redirect("/logs");
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  });

  

module.exports = logs;