const { getInput } = require("../common");

let numbers = getInput().map(Number);
numbers.sort((a, b) => a - b);
numbers.unshift(0);

let diffs = {
	0: 0,
	1: 0,
	2: 0,
	3: 1,
};

for (let i = 1, z = numbers.length; i < z; i++) {
	diffs[numbers[i] - numbers[i - 1]]++;
}

console.log(
	`The answer is ${diffs[1] * diffs[3]} (${diffs[1]} 1-jolts, ${
		diffs[3]
	} 3-jolts)`
);
