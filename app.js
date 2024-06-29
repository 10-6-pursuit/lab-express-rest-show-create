const express = require("express");


const app = express();



app.get("/", (req, res) => {
    res.send("You are now tuned in to the MF captain's log");
  });