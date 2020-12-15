const { getInput } = require("../common");

let numbers = getInput()[0].split(",").map(Number);

let spoken = new Map();
numbers.forEach((n, i) => spoken.set(n, [i + 1]));
for (let i = numbers.length; i < 2020; i++) {
	let last = numbers[i - 1];
	let next = spoken.get(last).length === 1 ? 0 : i - spoken.get(last)[1];
	numbers[i] = next;
	spoken.set(next, [i + 1, ...(spoken.get(next) || [])]);
}

console.log(`The last number spoken was ${numbers[numbers.length - 1]}`);
