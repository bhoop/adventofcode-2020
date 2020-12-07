const { getInput } = require("../common");

let input = getInput();

let map = {};

for (let line of input) {
	// find the name of the "container" bag (the first bag on the line)
	let container = line.match(/^(\w+ \w+) bag/)[1];
	if (!map[container]) map[container] = [];
	// find the names and quantities of the bags that go inside the container
	let matches = [...line.matchAll(/(\d+) (\w+ \w+) bag/g)].map((m) => [
		Number(m[1]),
		m[2],
	]);
	// store the relationship about what other bags the container holds to use later
	for (let [num, bag] of matches) {
		map[container].push([bag, num]);
	}
}

function count(bag) {
	// use reduce() to sum the calculations for each bag contained within this bag...
	return map[bag].reduce((sum, bags) => {
		// each bag increases the sum for itself, as well as the sum of all of the other
		// bags contained within THAT bag (all multiplied by the quantity)
		return sum + (1 + count(bags[0])) * bags[1];
	}, 0);
}

console.log(`shiny gold bag contains ${count("shiny gold")} total bags`);
