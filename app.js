const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Captain Logs App");
});

const logsController = require("./controllers/logsController")
app.use("/logs", logsController);

module.exports = app;