// part 2 works basically the same as part 1, except that for part 2
// I split up compile() into:
// getRule() - output regex for a given rule number
// compile() - compile an arbitrary rule value (or partial value) into a regex pattern

const { getInput } = require("../common");

let lines = getInput().join("\n");

let [rawRules, input] = lines.split("\n\n");

let rules = new Map();
rawRules.split("\n").forEach((r) => {
	let m = r.match(/^(\d+): (.+)$/);
	rules.set(
		m[1],
		/"[a-z]"/.test(m[2])
			? { compiled: true, value: m[2][1] }
			: { compiled: false, value: m[2] }
	);
});

let regex = new RegExp(`^${getRule("0")}$`);

console.log(getRule("42"));

let validLines = input.split("\n").filter((line) => regex.test(line));

console.log(`${validLines.length} valid lines`);

function getRule(ruleNo) {
	let rule = rules.get(ruleNo);
	if (!rule.compiled) {
		switch (ruleNo) {
			case "8":
				// "42 | 42 8" is the same thing as "one or more repetitions of 42"
				rule.value = `${getRule("42")}+`;
				break;
			case "11":
				// "42 31 | 42 11 31" can be interpreted as "any repetitions of 42 followed by the same number of repetitions of 31"
				let a = getRule("42"),
					b = getRule("31");
				// this is super-hacky, but /rule42+rule31+/ doesn't guarantee that 42 and 31 are repeated the same number of times
				// so I manually wrote out this pattern by adding "|rule42{N}rule31{N}" until the final count didn't change anymore
				rule.value = `(${a}{1}${b}{1}|${a}{2}${b}{2}|${a}{3}${b}{3}|${a}{4}${b}{4}|${a}{5}${b}{5})`;
				break;
			default:
				rule.value = compile(rule.value);
				break;
		}
		rule.compiled = true;
	}
	return rule.value;
}

function compile(raw) {
	let groups = raw.split(" | ");
	if (groups.length > 1) {
		return `(${groups.map(compile).join("|")})`;
	} else {
		return `${raw.split(" ").map(getRule).join("")}`;
	}
}
