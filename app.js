const express = require("express");
const app = express();
let logsArray = require("./models/log");

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Welcome to the Captain's Logs");
})

app.get("/logs", (req, res) => {
    res.send(logsArray);
})

app.get("/logs/:id", (req, res) => {
    const { id } = req.params;
    const filtered = logsArray.find(obj => obj.id === Number(id));
    console.log(filtered);
    if (filtered) {
        res.json(filtered);
    } else {
        res.redirect("/logs");
    }
})

app.get("*", (req, res) => {
    res.status(404).json({error:"page not found"});
})

app.post("/logs", (req, res) => {
    logsArray.push(req.body);
    res.json(logsArray[logsArray.length-1]);
})

app.delete("/logs/:id", (req, res) => {
    const { id } = req.params;
    const index = logsArray.findIndex(obj => obj.id === Number(id));
    const deletedId = logsArray.splice(index,1);
    res.status(202).json(deletedId[0]);
})


module.exports = app