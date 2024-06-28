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
	const log = logsData[arrayIndex];

	if (log) {
		res.json(log);
	} else {
		res.redirect("/9001");
	}
});

//create
logs.post("/", (req, res) => {
	logsData.push(req.body);
	res.json(logsData[logsData.length - 1]);
});
module.exports = logs;

//update

logs.put("/:id", (req, res) => {
	const { id } = req.params;
	let logIndex = logsData.findIndex((log) => log.id === Number(id));

	if (logIndex !== -1) {
		logsData[logIndex] = { ...logsData[logIndex], ...req.body };
		res.status(200).json(logsData[logIndex]);
	} else {
		res.status(404).json({ msg: `Log with id: ${id} not found` });
	}
});

//destroy

logs.delete("/:id", (req, res) => {
	const { id } = req.params;
	let logIndex = logsData.findIndex((log) => log.id === Number(id));
	if (logIndex !== -1) {
		logsData.splice(logIndex, 1);
		res.status(200).json({ msg: `Log with id: ${id} successfully deleted` });
	} else {
		res.status(404).json({ msg: `Log with id: ${id} not found` });
	}
});
