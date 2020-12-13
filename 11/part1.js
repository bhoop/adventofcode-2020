const { getInput } = require("../common");

let start = getInput();
let cols = start[0].length;
let rows = start.length;

let prev = start.join("");
while (true) {
	let next = recalc(prev);
	if (next === prev) break;
	else prev = next;
}

// console.log("Final state:");
// debug(prev);
let takenSeats = prev.split("").filter((c) => c === "#").length;
console.log(`There are ${takenSeats} empty seats.`);

function recalc(state) {
	let v = (x, y, i) => val(state, x, y, i);
	return state
		.split("")
		.map((c, i) => {
			let neighbors = [
				v(-1, -1, i),
				v(0, -1, i),
				v(1, -1, i),
				v(-1, 0, i),
				v(1, 0, i),
				v(-1, 1, i),
				v(0, 1, i),
				v(1, 1, i),
			];
			let occupiedNeighbors = neighbors.filter((c) => c === "#");
			if (c === "L" && occupiedNeighbors.length === 0) {
				return "#";
			}
			if (c === "#" && occupiedNeighbors.length >= 4) {
				return "L";
			}
			return c;
		})
		.join("");
}

function val(arr, dx, dy, i) {
	let x = (i % cols) + dx;
	let y = Math.floor(i / cols) + dy;

	if (x < 0 || y < 0 || x >= cols || y >= rows) return "-";
	return arr[y * cols + x];
}

function debug(state) {
	for (i = 0; i < state.length; i += cols) {
		console.log(state.substring(i, i + cols));
	}
}
