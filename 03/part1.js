const { getInput } = require("../common");

let input = getInput();

let width = input[0].length,
	height = input.length,
	x = 0,
	y = 0;

let treesHit = 0;
console.log(height, width, x, y);
while (y < height) {
	console.log(`[${y},${x}]`);
	if (input[y][x] === "#") treesHit++;
	x += 3;
	if (x >= width) {
		x = x - width;
	}
	y++;
}

console.log(`${treesHit} trees were hit on the way down.`);
