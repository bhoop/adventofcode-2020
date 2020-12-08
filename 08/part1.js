const { getInput } = require("../common");

let program = getInput();
let pointer = 0;
let seen = new Set();
let acc = 0;

while (pointer < program.length) {
	if (seen.has(pointer)) {
		break;
	}
	seen.add(pointer);
	let instruction = program[pointer];
	let command = instruction.substring(0, 3);
	let value = instruction.substring(4);
	console.log(pointer, command, value);
	switch (command) {
		case "nop":
			pointer++;
			break;
		case "acc":
			acc += Number(value);
			pointer++;
			break;
		case "jmp":
			pointer += Number(value);
			break;
	}
}

console.log(`The accumulator value is ${acc}`);
