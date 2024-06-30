const express = require("express");
const logs = express.Router();
const logsArray = require("../models/log");

logs.get("/", (req, res) => {
    res.status(200).send(logsArray);
});

logs.post("/", (req, res) => {
    const incomingLog = { id: logsArray.length + 1, ...req.body};
    logsArray.push(incomingLog);
    res.status(201).send(logsArray[logsArray.length - 1]);
});

// workout.post("/", (req, res) => {
//     const currentWorkout = {id: workoutArray.length + 1, ...req.body};
//     workoutArray.push(currentWorkout);
//     res.status(201).send(workoutArray[workoutArray.length - 1]);
// });

module.exports = logs;