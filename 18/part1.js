const { getInput } = require("../common");

const ops = {
	"+": (a, b) => a + b,
	"*": (a, b) => a * b,
};

let equations = getInput();

let sum = equations.reduce(
	(p, v) => p + calc(v.replace(/ /g, "").split("")),
	0
);

console.log(`All equations sum to ${sum}`);

function calc(parts) {
	let a = parts.shift();
	if (a === "(") a = calc(parts);
	else a = Number(a);

	let op = parts.shift();
	if (op === ")" || !op) return a;

	let b = parts.shift();
	if (b === "(") b = calc(parts);
	else b = Number(b);

	// console.log(`${a} ${op} ${b}`);

	let c = ops[op](a, b);
	parts.unshift(c);

	// console.log(`= ${c}`);

	return calc(parts);
}
