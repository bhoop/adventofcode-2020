const { getInput } = require("../common");

let state = getInput();

let cubes = new Map();

// add each initial cube
for (let y = 0; y < state.length; y++) {
	for (let x = 0; x < state[y].length; x++) {
		if (state[y][x] === "#") cubes.set(`${x}:${y}:0:0`, cube(x, y, 0, 0));
	}
}

console.log(`Turn 0: We ${cubes.size} active cubes`);

for (let i = 0; i < 6; i++) {
	let pings = {};
	let toRemove = [];
	cubes.forEach((c) => {
		let onNeighbors = 0;
		for (let _z = -1; _z <= 1; _z++) {
			for (let _y = -1; _y <= 1; _y++) {
				for (let _x = -1; _x <= 1; _x++) {
					for (let _w = -1; _w <= 1; _w++) {
						// never check itself
						if (_z === 0 && _y === 0 && _x === 0 && _w === 0) continue;
						let id = cube(c.x + _x, c.y + _y, c.z + _z, c.w + _w).id;
						if (cubes.has(id)) {
							// track that this neighbor is on, in case we need to turn it off
							onNeighbors++;
						} else {
							// ping all of the neighboring blocks to see if they need to be turned on
							pings[id] = (pings[id] || 0) + 1;
						}
					}
				}
			}
		}
		// if the cube is active and the number of active neighbors is not 2 or 3, it becomes inactive
		if (onNeighbors < 2 || onNeighbors > 3) {
			toRemove.push(c.id);
		}
	});
	// remove any cubes that are turning off
	toRemove.forEach((id) => cubes.delete(id));
	// activate any cubes that have exactly 3 active neighbors
	for (let id in pings) {
		if (pings[id] === 3) cubes.set(id, cube(...id.split(":").map(Number)));
	}
	console.log(`Turn ${i + 1}: ${cubes.size} active cubes`);
}

console.log(`There are ${cubes.size} active cubes.`);

function cube(x, y, z, w) {
	return {
		id: `${x}:${y}:${z}:${w}`,
		x,
		y,
		z,
		w,
	};
}
