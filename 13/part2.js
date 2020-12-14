const { getInput } = require("../common");

// had to give up and use someone else's solution:
// https://github.com/matthewgehring/adventofcode/blob/main/2020/day13/script.js

let buses = getInput()[1]
	.split(",")
	.map((val) => (Number(val) ? BigInt(val) : "x"));
let pairs = buses
	.map((elm, i) => typeof elm === "bigint" && [elm, BigInt(i)])
	.filter((elm) => elm);
let N = 1n;
pairs.forEach((pair) => (N *= pair[0]));
let Ni = pairs.map((pair) => N / pair[0]);
let b = pairs.map((pair, i) => (i === 0 ? 0n : pair[0] - pair[1]));
let x = pairs.map((item, i) => modInverse(Ni[i], item[0]));
let bnx = Ni.map((item, i) => item * b[i] * x[i]);
let sum = bnx.reduce((acc, cur) => acc + cur);
console.log(sum - (sum / N) * N);

function modInverse(a, m) {
	let g = gcd(a, m);

	if (g != 1n) {
		console.log("No Inverse");
	} else {
		return power(a, m - 2n, m);
	}
}

function power(x, y, m) {
	if (y === 0n) return 1n;

	let p = power(x, y / 2n, m) % m;
	p = (p * p) % m;

	if (y % 2n === 0n) return p;
	else return (x * p) % m;
}

function gcd(a, b) {
	if (a === 0n) return b;
	return gcd(b % a, a);
}
