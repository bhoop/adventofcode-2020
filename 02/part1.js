const { getInput } = require("../common");

let input = getInput();

let valid = input.filter((line) => {
	// split "2-5 a: mypassword" into its component parts
	let [_, min, max, char, word] = line.match(/^(\d+)-(\d+) (\w): ([^\n]+)$/);
	// count how many times "a" shows up in "mypassword"
	let count = (word.match(new RegExp(char, "g")) || []).length;
	// password is valid if "a" shows up at least "2" times but no more than "5" times
	return min <= count && max >= count;
});

console.log(`There are ${valid.length} valid passwords`);
