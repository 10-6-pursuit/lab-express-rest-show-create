const express = require("express");



const app = express();

app.use(express.json());



app.get("/", (req, res) => {
    res.send("You are now tuned in to the MF captain's log");
  });


const logsController = require("./controllers/logsController.js")
app.use("/logs", logsController);



app.get("*", (req, res) => {
    res.status(404).json({ error: "Sorry, no page found!" });
  });

  module.exports = app;