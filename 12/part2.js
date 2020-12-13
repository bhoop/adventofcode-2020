const { getInput } = require("../common");

let nav = getInput();

let coords = { x: 0, y: 0 };
let waypoint = { x: 10, y: 1 };

for (let n of nav) {
	let cmd = n[0];
	let dist = Number(n.substring(1));
	let r, a;
	switch (cmd) {
		case "N":
			waypoint.y += dist;
			break;
		case "S":
			waypoint.y -= dist;
			break;
		case "E":
			waypoint.x += dist;
			break;
		case "W":
			waypoint.x -= dist;
			break;
		case "L":
			waypoint = rotate(waypoint.x, waypoint.y, dist * -1);
			break;
		case "R":
			waypoint = rotate(waypoint.x, waypoint.y, dist);
			break;
		case "F":
			coords.x += waypoint.x * dist;
			coords.y += waypoint.y * dist;
			break;
	}
}

console.log(`Ship ends up at ${JSON.stringify(coords)}`);
console.log(`Manhattan distance is ${Math.abs(coords.x) + Math.abs(coords.y)}`);

// from https://stackoverflow.com/questions/17410809/how-to-calculate-rotation-in-2d-in-javascript
function rotate(x, y, angle) {
	var radians = (Math.PI / 180) * angle,
		cos = Math.cos(radians),
		sin = Math.sin(radians),
		nx = cos * x + sin * y,
		ny = cos * y - sin * x;
	return { x: nx, y: ny };
}
