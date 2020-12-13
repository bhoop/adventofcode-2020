const { getInput } = require("../common");

let nav = getInput();

let coords = { x: 0, y: 0 };
let facing = 0;

for (let n of nav) {
	let cmd = n[0];
	let dist = Number(n.substring(1));
	switch (cmd) {
		case "N":
			coords.y += dist;
			break;
		case "S":
			coords.y -= dist;
			break;
		case "E":
			coords.x += dist;
			break;
		case "W":
			coords.x -= dist;
			break;
		case "L":
			facing += (dist * Math.PI) / 180;
			break;
		case "R":
			facing -= (dist * Math.PI) / 180;
			break;
		case "F":
			coords.x += dist * Math.cos(facing);
			coords.y += dist * Math.sin(facing);
			break;
	}
}

console.log(`Ship ends up at ${JSON.stringify(coords)}`);
console.log(`Manhattan distance is ${Math.abs(coords.x) + Math.abs(coords.y)}`);
