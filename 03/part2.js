const { getInput } = require("../common");

let input = getInput();

let width = input[0].length,
	height = input.length;

// wrap the same logic from part 1 in a function so it can be re-used.
function ski(dx, dy) {
	let x = 0,
		y = 0;
	let treesHit = 0;
	while (y < height) {
		if (input[y][x] === "#") treesHit++;
		x += dx;
		if (x >= width) {
			x = x - width;
		}
		y += dy;
	}
	return treesHit;
}

let product = ski(1, 1) * ski(3, 1) * ski(5, 1) * ski(7, 1) * ski(1, 2);

console.log(`The answer is ${product}.`);
