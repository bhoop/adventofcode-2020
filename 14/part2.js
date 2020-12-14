const { getInput } = require("../common");

let input = getInput();

let memory = new Map();
let mask = "";

for (let cmd of input) {
	if (cmd.startsWith("mask = ")) {
		mask = cmd.substring(7);
	} else {
		// extract the address and value from the input line
		let match = cmd.match(/mem\[(\d+)\] = (\d+)/);
		let value = Number(match[2]);
		// apply the mask to the address
		let addrs = applyMask(
			mask,
			Number(match[1]).toString(2).padStart(36, "0")
		);
		// assign the value to each address we got back from applyMask()
		// (might be just one if mask had no "X" characters)
		addrs.forEach((addr) => memory.set(parseInt(addr, 2), value));
	}
}

// Sum up all of the values in memory and print that sum out
console.log(Array.from(memory.values()).reduce((p, v) => p + v, 0));

function applyMask(mask, value) {
	// if the mask character is "X", then we want to return two values
	// (one replacing the mask with "1", the other with "0"). Otherwise,
	// just return the current value
	let place =
		mask[0] === "X" ? ["0", "1"] : mask[0] === "1" ? ["1"] : [value[0]];
	return mask.length === 1
		? // applyMask() is a recursive function, so once we get to the 36th character,
		  // we don't need to recurse anymore and can simply return this index's value
		  place
		: // if we're not at the last step, then add the current character value
		  // to the beginning of every possible set of addresses later in the
		  // line (as handled by recursive calls to applyMask(), each with
		  // a mask and value that includes everything but the current character).
		  place.flatMap((v) =>
				applyMask(mask.substring(1), value.substring(1)).map((v2) => v + v2)
		  );
}
