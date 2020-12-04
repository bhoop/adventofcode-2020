var fs = require("fs");

exports.getInput = function getInput(asNumbers = false) {
	let lines = process.stdin.isTTY
		? process.argv.slice(2)
		: fs.readFileSync(0, "utf-8").split(/\r?\n/g);

	if (asNumbers) lines = lines.map(Number).filter((n) => !!n);
	return lines;
};
