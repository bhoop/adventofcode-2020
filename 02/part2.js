const { getInput } = require("../common");

let input = getInput();

let valid = input.filter((line) => {
	// split "2-5 a: mypassword" into its component parts
	let [_, i, j, char, word] = line.match(/^(\d+)-(\d+) (\w): ([^\n]+)$/);
	// check if the character at "2" and "5" match "a"
	let ci = word[i - 1] === char ? 1 : 0,
		cj = word[j - 1] === char ? 1 : 0;
	// password is valid if exactly one of the positions matches "a" (no more, no less)
	return ci + cj === 1;
});

console.log(`There are ${valid.length} valid passwords`);
