const { getInput } = require("../common");

let input = getInput();

let seats = input.map(getSeats);
let seatIds = seats.map(([r, c]) => r * 8 + c);

seatIds.sort();

for (let i = 0, z = seatIds.length - 1; i < z; i++) {
	if (seatIds[i + 1] - seatIds[i] === 2) {
		console.log(`My seat is ${seatIds[i] + 1}`);
	}
}

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
