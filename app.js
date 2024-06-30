const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Captain Logs App");
});

app.get("/logs/not-found", (req, res) => {
    res.status(404).send(`<h1>404 index not found</h1>`);
});

const logsController = require("./controllers/logsController")
app.use("/logs", logsController);

module.exports = app;