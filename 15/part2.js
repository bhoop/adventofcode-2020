const { getInput } = require("../common");

let numbers = getInput()[0].split(",").map(Number);

let lastPosition = new Map();
let lastDistance = new Map();
let last = 0;
numbers.forEach((n, i) => {
	lastPosition.set(n, i + 1);
	lastDistance.set(n, 0);
	last = n;
});

for (let i = numbers.length + 1; i <= 30000000; i++) {
	let next = lastDistance.get(last);
	lastDistance.set(
		next,
		lastPosition.has(next) ? i - lastPosition.get(next) : 0
	);
	lastPosition.set(next, i);
	last = next;
}

console.log(`The last number spoken was ${last}`);
