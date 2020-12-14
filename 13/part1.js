const { getInput } = require("../common");

let input = getInput();
let now = Number(input[0]);
let busses = input[1]
	.split(",")
	.filter((x) => x !== "x")
	.map((b) => {
		b = Number(b);
		return { num: b, time: b - (now % b) };
	});
let bus = busses.reduce((p, v) => (v.time < p.time ? v : p), {
	time: Infinity,
});

console.log(`The next bus is`, bus, bus.time * bus.num);
