const { getInput } = require("../common");

let input = getInput().join(`\n`);

let records = input.split(/\n\n/g);

let validRecords = records.filter((r) => {
	let fields = new Set(
		r
			.split(/\s+/g)
			.filter((f) => {
				let [field, value] = f.split(/:/);
				switch (field) {
					case "byr":
						return inRange(value, 1920, 2002);
					case "iyr":
						return inRange(value, 2010, 2020);
					case "eyr":
						return inRange(value, 2020, 2030);
					case "hgt":
						let num = value.substring(0, value.length - 2);
						switch (value.substring(value.length - 2)) {
							case "cm":
								return inRange(num, 150, 193);
							case "in":
								return inRange(num, 59, 76);
							default:
								return false;
						}
					case "hcl":
						return /^#[0-9a-f]{6}$/i.test(value);
					case "ecl":
						return [
							"amb",
							"blu",
							"brn",
							"gry",
							"grn",
							"hzl",
							"oth",
						].includes(value);
					case "pid":
						return /^[0-9]{9}$/.test(value);
					case "cid":
						return true;
					default:
						return false;
				}
			})
			.map((f) => f.substring(0, 3))
	);
	return fields.size === 8 || (fields.size === 7 && !fields.has("cid"));
});

console.log(`There are ${validRecords.length} valid passports`);

function inRange(value, min, max) {
	let n = Number(value);
	return n >= min && n <= max;
}
