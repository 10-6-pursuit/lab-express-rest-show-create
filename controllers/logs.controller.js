const express = require("express");
const logs = express.Router();
const logsData = require("../models/log.model");

//Index
logs.get("/", (req, res) => {
	let filteredLogs = logsData;
	if (req.query.order) {
		filteredLogs = sortLogsData(filteredLogs, req.query.order);
	}

	if (req.query.mistakes) {
		filteredLogs = filteredLogs.filter(
			(log) => log.mistakesWereMadeToday === req.query.mistakes
		);
	}

	res.status(200).json(filteredLogs);
});
function sortLogsData(logs, order) {
	return [...logs].sort((a, b) => {
		if (a.title < b.title) {
			return order === "asc" ? -1 : 1;
		} else if (a.title > b.title) {
			return order === "asc" ? 1 : -1;
		} else {
			return 0;
		}
	});
}

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
