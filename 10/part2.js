const { getInput } = require("../common");

// convert input into numbers and sort
let numbers = getInput().map(Number);
numbers.sort((a, b) => a - b);

// add "0" to the start of the list to represent the terminal
numbers.unshift(0);

// for each adapter, count how many adapters can be plugged into it.
// i.e. for [1,4,5,6]: 1 can have one adapter plugged into it (4), 4 can have two adapters plugged into it (5 and 6), etc...
let possibilities = new Map();
for (let n of numbers) {
	possibilities.set(
		n,
		numbers.filter((x) => x > n && x <= n + 3)
	);
}

// starting from the end, count how many possible combinations there are
// i.e. for [1,2,3,4,5]:
// - we special-case the last adapter (5) to have one possible combination
// - 4 can only have one adapter plugged into it (5), and 5 only has one possible combination, so 4 can only have one combination
// - 3 can have two adapters plugged into it (4 and 5). 4 has one possible combination, 5 has one possible combination, so 3 has two possible combinations (1+1=2)
// - 2 can have three adapters plugged into it (3, 4, and 5). Adding the combinations of those adapters that we've already calculated gives us five possible combinations (3 has 2, 4 has 1, 5 has 1... 2 + 1 + 1 = 5)
// - 1 can have three adapters plugged into it (2, 3, and 4), and a total combination of 5+2+1 = 8
// so 8 is our final answer
let counts = new Map();
counts.set(numbers[numbers.length - 1], 1);
console.log(counts);
for (let i = numbers.length - 2; i >= 0; i--) {
	let a = numbers[i];
	console.log(a);
	counts.set(
		a,
		possibilities.get(a).reduce((sum, a2) => sum + counts.get(a2), 0)
	);
}
console.log(counts);
