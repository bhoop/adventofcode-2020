const { getInput } = require("../common");

let input = getInput().join(`\n`);

let records = input.split(/\n\n/g);

let validRecords = records.filter((r) => {
	// ignoring values, boil down each passport into just the fields present
	// (use a Set to avoid duplicate entries throwing off the count)
	let fields = new Set(
		r
			.split(/\s+/g)
			.map((f) => f.substring(0, 3))
			.filter((f) =>
				["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"].includes(f)
			)
	);
	// passport is valid if there are 8 fields present or 7 and the missing field is "cid"
	return fields.size === 8 || (fields.size === 7 && !fields.has("cid"));
});

console.log(`There are ${validRecords.length} valid passports`);
