const { getInput } = require("../common");

let program = getInput();
// console.log(program);

let index = findNextIndex(-1);
while (index > -1) {
	let copy = [...program];
	copy[index] =
		program[index].substring(0, 3) === "nop"
			? program[index].replace("nop", "jmp")
			: program[index].replace("jmp", "nop");
	// console.log("swap instruction at " + index);
	// console.log(copy);

	try {
		let { acc } = run(copy);
		// if we get here, then the program didn't see an infinite loop!
		console.log(`The program terminated normally with acc=${acc}`);
		break;
	} catch ({ pointer }) {
		// console.log(`INFINITE LOOP AT ${pointer}`);
		// the program hit an infinite loop, try swapping the next jmp/nop...
		index = findNextIndex(index);
	}
}

function findNextIndex(last) {
	return program.findIndex((v, i) => i > last && /^(nop|jmp) /.test(v));
}

function run(program) {
	let pointer = 0;
	let seen = new Set();
	let acc = 0;

	while (pointer < program.length) {
		if (seen.has(pointer)) {
			throw { acc, pointer };
		}
		seen.add(pointer);
		let instruction = program[pointer];
		let command = instruction.substring(0, 3);
		let value = instruction.substring(4);
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

	return { acc };
}
