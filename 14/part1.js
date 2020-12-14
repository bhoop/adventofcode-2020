const { getInput } = require("../common");

let input = getInput();

let memory = new Map();
let mask = "";

for (let cmd of input) {
	if (cmd.startsWith("mask = ")) {
		// update the mask
		mask = cmd.substring(7);
	} else {
		// extract the address and value from the input line
		let match = cmd.match(/mem\[(\d+)\] = (\d+)/);
		memory.set(
			Number(match[1]),
			Number(match[2])
				// convert the value to decimal notation
				.toString(2)
				// ensure the value is 36 characters long
				.padStart(36, "0")
				// split the string into an array
				.split("")
				// for each character in the value, either leave as-is
				// (if mask is "X"), or replace with the character in the mask
				.map((c, i) => (mask[i] === "X" ? c : mask[i]))
				.join("")
		);
	}
}

// console.log(memory);
console.log(
	Array.from(memory.values()).reduce((p, v) => p + parseInt(v, 2), 0)
);
