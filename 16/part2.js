const { getInput } = require("../common");

let [fields, myTicket, nearbyTickets] = getInput().join("\n").split("\n\n");

// parse fields
let validValues = new Set();
fields = fields.split("\n").map((rule) => {
	let [name, ranges] = rule.split(": ");
	let values = new Set();
	ranges.split(" or ").forEach((range) => {
		let [min, max] = range.split("-").map(Number);
		for (let i = min; i <= max; i++) {
			validValues.add(i);
			values.add(i);
		}
	});
	return { name, values };
});

// Format "my ticket"
myTicket = myTicket
	.match(/[\d,]+/)[0]
	.split(",")
	.map(Number);

// weed out invalid tickets
validTickets = nearbyTickets
	// one ticket per line
	.split("\n")
	// remove the "nearby tickets: " line
	.slice(1)
	// split each ticket into its numbers
	.map((t) => t.split(",").map(Number))
	// remove the tickets that have at least one invalid value (a number that doesn't fit into any range)
	.filter((t) => t.every((n) => validValues.has(n)))
	// add "my ticket"
	.concat([myTicket]);

// group together the values for each field in each valid ticket
// i.e. if Ticket A = [1,2] and Ticket B = [8,9] then ticketValues = [ [1,8], [2,9] ]
let ticketValues = fields.map((f, i) => validTickets.map((t) => t[i]));

// for each set of field values, find the field whose ranges include all of the values we have for it
// at first, more than one field might appear to be a valid match for a set of values. If that happens
// then we need to come back to that field after we've had a chance to assign other fields (with the idea
// being that by the time we get back to that field that some of the fields that had appeared to be valid
// for that range of values have been assigned elsewhere because they were the only valid field for a different
// range of values)
let ticketFields = new Map();
// create a list of indexes that we haven't found the assigned field for
let indexes = fields.map((f, i) => i);
// continue looping through the above list until we've assigned every field
while (indexes.length > 0) {
	// pull out the first entry in the list
	let index = indexes.shift();
	// check to see if there's exactly one field whose ranges contain this set of values
	let validFields = fields.filter((f) =>
		ticketValues[index].every((n) => f.values.has(n))
	);
	if (validFields.length === 1) {
		// if there was exactly one field that allows for all the values in this set, then
		// assign that field to this index...
		ticketFields.set(index, validFields[0]);
		// ...and remove the field from the unassigned fields list
		fields = fields.filter((f) => f !== validFields[0]);
	} else {
		// if more than one field allows for all the values in this set then
		// add the index onto the end of the "unassigned indexes" list so that
		// we can come back to it after we've had a chance to assign other fields
		indexes.push(index);
	}
}

// ticketFields.forEach((field, index) => {
// 	console.log(`${index}: ${field.name}`);
// });

// now that we've figured out which field goes in which column,
// find all the columns in "my ticket" whose field starts with 'departure'
// and multiply the values together.
console.log(
	myTicket.reduce((p, v, i) => {
		if (ticketFields.get(i).name.startsWith("departure")) {
			console.log(`${p} x ${v} = ${p * v}`);
			return p * v;
		} else return p;
	}, 1)
);
