const { getInput } = require("../common");

let [fields, myTicket, nearbyTickets] = getInput().join("\n").split("\n\n");

// parse fields
let validValues = new Set();
fields.split("\n").forEach((rule) => {
	rule.match(/\d+-\d+/g).forEach((range) => {
		let [min, max] = range.split("-").map(Number);
		for (let i = min; i <= max; i++) {
			validValues.add(i);
		}
	});
});

// validate nearby tickets
let invalidValues = nearbyTickets
	.split("\n")
	.slice(1)
	.flatMap((ticket) => {
		return ticket.split(",").filter((n) => !validValues.has(Number(n)));
	}, [])
	.reduce((p, v) => p + Number(v), 0);
console.log(invalidValues);

// let invalidFields = nearbyTickets
