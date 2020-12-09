const { getInput } = require("../common");

let numbers = getInput().map(Number);

let target = 26134589; // this is the invalid number from step 1
let found = false;

// our "subset" starts at 0-1
let i = 0;
let j = 1;
// "sum" is the sum of the numbers between i and j
let sum = numbers[i] + numbers[j];

while (true) {
	// if sum is smaller than our target, then expand our subset by increasing j (away from i)
	// and then add the new value to our sum
	if (sum < target) {
		j++;
		sum += numbers[j];
	}
	// if sum is larger than our target, then contract our subset by increasing i (towards j)
	// and then remove the value that was at the old "i" (since it's no longer in our subset)
	else if (sum > target) {
		sum -= numbers[i];
		i++;
	}
	// once sum === target, then we know what our subset is
	else {
		let subset = numbers.slice(i, j + 1);
		// get the min and max values within the subset
		let min = Math.min(...subset);
		let max = Math.max(...subset);
		console.log(`${min + max} is the encryption weakness`);
		break;
	}
}
