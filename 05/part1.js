const { getInput } = require("../common");

let input = getInput();

let seats = input.map(getSeats);
let seatIds = seats.map(([r, c]) => r * 8 + c);

// console.log(seats);
// console.log(seatIds);

console.log(`The max seat ID is ${Math.max(...seatIds)}`);

function getSeats(str) {
	let row = bst(str.substring(0, 7), 0, 127);
	let col = bst(str.substring(7), 0, 7);
	return [row, col];
}

function bst(cmds, min, max) {
	let cmd = cmds[0];
	let d = Math.ceil((max - min) / 2);
	if (cmd === "F" || cmd === "L") {
		return cmds.length === 1 ? min : bst(cmds.substring(1), min, max - d);
	} else {
		return cmds.length === 1 ? max : bst(cmds.substring(1), min + d, max);
	}
}
