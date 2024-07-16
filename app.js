const express = require("express");

const app = express();

const cors = require("cors")

const captainController = require("./controllers/logsController")

app.use(express.json());
app.use(cors());

app.use("/",captainController)
app.use("/logs",captainController);

module.exports = app;