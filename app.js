// DEPENDENCIES
const express = require("express");

// CONFIGURATION
const app = express();
const path = require('path');

//GETTING LOGS-INFO
const logsInfo = require("./models/log.js");

app.use((req, res, next) => {
    console.log("This code runs for every request");
    return next();
  });

// ROUTES
app.get("/", (req, res) => {
    res.send("welcome to the captain's log");
});

// LOGS
app.get("/logs", (req, res) => {
    res.json(logsInfo);
});

/*
app.use((req, res, next) => {
    console.log("This code runs for every request");
    return next();
  });
  //app.use(express.json())
  */

app.post("/logs", (req, res) => {
    const newLog = {
        captainName: "Picard",
        title: "Stars",
        post: "Today I contemplated that there sure are a lot of stars in the sky",
        mistakesWereMadeToday: true,
        daysSinceLastCrisis: "10",
    };
    logsInfo.push(newLog);
    res.json(logsInfo);
});


app.get('/logs/:arrayIndex', (request, response) => {
    var indexRequest = request.params.arrayIndex;
    if (logsInfo[indexRequest] != undefined)
        response.send(logsInfo[indexRequest]);
    else
        response.status(404).redirect("404");
});
/*
app.get('/404', (request, response) => {
    response.sendFile(path.join(__dirname, "404.html"));
});
*/


app.delete('/logs/:arrayIndex', (request, response) => {
    var indexRequest = request.params.arrayIndex;
    if (logsInfo[indexRequest] != undefined) {
        logsInfo.splice(indexRequest, 1);
        response.send(logsInfo);
    }
    else
        response.status(404).redirect("404");
});

app.put('/logs/:arrayIndex', (request, response) => {
    var indexRequest = request.params.arrayIndex;
    if (logsInfo[indexRequest] != undefined) {
        logsInfo[indexRequest].post="**UPDATED***";
        response.send(logsInfo);
    }
    else
        response.status(404).redirect("404");
});

/*
app.all('*', (req, res) => {
    res.status(404).redirect("404");
}); */



/*
const locationsController = require("./controllers/locations.controller.js");
app.use("/locations", locationsController);


const machinesController = require("./controllers/locations.controller.js");
app.use("/machines", machinesController);


const personsController = require("./controllers/persons.controller.js");
app.use("/persons", personsController);

const plansController = require("./controllers/plans.controller.js");
app.use("/plans", plansController);

const specialeventsController = require("./controllers/special-events.controller.js");
app.use("/special-events", specialeventsController);
*/

// EXPORT
module.exports = app;