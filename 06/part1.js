const { getInput } = require("../common");

let input = getInput().join(`\n`);
let groups = input.split(/\n\n/g);

let output = groups.reduce((sum, groupString) => {
	// use Set to ensure we only keep one instance of each question being answered in the group.
	// since we don't care about individual answers (only the aggregate), join all the answers
	// in the group into a single line.
	return sum + new Set(groupString.replace(/\n/g, "").split("")).size;
}, 0);

console.log(`The sum is ${output}`);
