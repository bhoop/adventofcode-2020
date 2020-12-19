const { getInput } = require("../common");

let lines = getInput().join("\n");

let [rawRules, input] = lines.split("\n\n");

// create a Map containing all of the rules
let rules = new Map();
rawRules.split("\n").forEach((r) => {
	let m = r.match(/^(\d+): (.+)$/);
	rules.set(
		Number(m[1]),
		/"[a-z]"/.test(m[2])
			? // if this "rule" is a single character, we can consider it compiled already
			  { compiled: true, value: m[2][1] }
			: // otherwise it's a parent rule that hasn't been compiled yet
			  { compiled: false, value: m[2] }
	);
});

// compile rule #0 into a regex pattern
let regex = new RegExp(`^${compile(rules.get(0).value)}$`);

// test how many lines match the pattern
let validLines = input.split("\n").filter((line) => regex.test(line));

console.log(`${validLines.length} valid lines`);

// return a regex pattern for a given rule value
function compile(rule) {
	let groups = rule.split(" | ");
	if (groups.length > 1) {
		// i.e. "1 | 2" => "(WHATEVER_1_IS|WHATEVER_2_IS)"
		return `(${groups.map(compile).join("|")})`;
	} else {
		// Concat a simple sequence
		// i.e.
		// 1: "a"
		// 2: 4 1
		// 4: "b"
		//
		// Then "1 2" => "a 2" => "a 4 1" => "aba"
		return `${rule
			.split(" ")
			.map((r) => {
				let rr = rules.get(Number(r));
				if (!rr.compiled) {
					rr.value = compile(rr.value);
					rr.compiled = true;
				}
				return rr.value;
			})
			.join("")}`;
	}
}
