const { getInput } = require("../common");

let input = getInput();

let map = {};

for (let line of input) {
	// find all instances of "___ ___ bag" in the line
	let matches = line.match(/\w+ \w+ bag/g);
	let container = matches.shift();
	if (!map[container]) map[container] = { contains: [], containedBy: [] };
	for (let inner of matches) {
		if (!map[inner]) map[inner] = { contains: [], containedBy: [] };
		map[container].contains.push(inner);
		map[inner].containedBy.push(container);
	}
}

let containers = new Set();
console.log(map["shiny gold bag"]);
let queue = map["shiny gold bag"].containedBy.slice();
while (queue.length > 0) {
	let bag = queue.shift();
	for (let b of map[bag].containedBy) {
		if (!containers.has(b)) queue.push(b);
	}
	containers.add(bag);
}

console.log(`shiny gold is contained by ${containers.size} bags`);
