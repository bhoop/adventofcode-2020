const { getInput } = require("../common");

let input = getInput().join(`\n`);
let groups = input.split(/\n\n/g);

let output = groups.reduce((sum, groupString) => {
	// use intersect() to find the common answers among everyone in the group
	return (
		sum + intersect(groupString.split("\n").map((x) => x.split(""))).length
	);
}, 0);

console.log(`The sum is ${output}`);

function intersect(arrays) {
	return arrays.reduce(function (out, arr) {
		return out.filter((x) => arr.includes(x));
	}, arrays[0]);
}
