const express = require("express");
const logs = express.Router();
const logsData = require("../models/log.model");

//Index
logs.get("/", (req, res) => {
	res.json(logsData);
});

//Show
logs.get("/:arrayIndex", (req, res) => {
	const { arrayIndex } = req.params;
	const log = logsData[arrayIndex]

	if (log) {
		res.json(log);
	} else {
    res.redirect("/9001")
	}
});

module.exports = logs;
