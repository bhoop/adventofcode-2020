const { getInput } = require("../common");

let numbers = getInput().map(Number);
let preamble = 25;

function check(i) {
	for (let j = i - preamble; j < i - 1; j++) {
		for (let k = j + 1; k < i; k++) {
			if (numbers[j] + numbers[k] === numbers[i]) return true;
		}
	}
	return false;
}

for (let i = preamble, z = numbers.length; i < z; i++) {
	if (!check(i)) {
		console.log(`Line #${i} (${numbers[i]}) fails check.`);
		break;
	}
}
