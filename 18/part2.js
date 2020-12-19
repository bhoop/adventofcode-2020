const { getInput } = require("../common");

const ops = {
	"+": (a, b) => Number(a) + Number(b),
	"*": (a, b) => Number(a) * Number(b),
};
let equations = getInput();

let sum = equations.reduce(
	(p, v) => p + solve(v.replace(/ /g, "").split("")),
	0
);

console.log(`All equations sum to ${sum}`);

function solve(parts) {
	// initialize the output value to be the first number in the equation
	let output = value(parts);
	let op = parts.shift();
	// while we have operations in the equation, evaulate them and update the output
	// - if op is ever ")", then we've reached the end of a sub-equation and can return the current output value
	// - if op is ever undefined, then we've reached the end of the main equation
	while (op && op !== ")") {
		let b = value(parts);
		// as long as this equation is multiplication and the next is addition,
		// evaluate the addition first because it has priority
		while (op === "*" && parts[0] === "+") {
			// take the "+" off the stack
			parts.shift();
			// get the next value
			let c = value(parts);
			// add the next value to the right-hand value of the lower-priority multiplication
			b += c;
		}
		// calculate the addition or multiplication
		output = ops[op](output, b);
		// tee up the next operation
		op = parts.shift();
	}
	// all of the operations in this equation (or sub-equation) have been evalulated.
	return output;
}

function value(parts) {
	let v = parts.shift();
	return v === "(" ? solve(parts) : Number(v);
}
