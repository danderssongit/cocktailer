type Unit = {
	name: string;
	aliases: string[];
	toMetric: (value: number) => { value: number; unit: string };
	toImperial: (value: number) => { value: number; unit: string };
};

const units: Unit[] = [
	{
		name: "oz",
		aliases: ["oz", "ounce", "ounces", "fl oz"],
		toMetric: (value) => ({ value: value * 29.5735, unit: "ml" }),
		toImperial: (value) => ({ value, unit: "oz" }),
	},
	{
		name: "cup",
		aliases: ["cup", "cups"],
		toMetric: (value) => ({ value: value * 236.588, unit: "ml" }),
		toImperial: (value) => ({ value, unit: "cup" }),
	},
	{
		name: "spoon",
		aliases: ["spoon", "spoons", "tblsp", "tbsp", "tablespoon", "tablespoons"],
		toMetric: (value) => ({ value: value * 14.7868, unit: "ml" }),
		toImperial: (value) => ({ value, unit: "tbsp" }),
	},
	{
		name: "teaspoon",
		aliases: ["tsp", "teaspoon", "teaspoons"],
		toMetric: (value) => ({ value: value * 4.92892, unit: "ml" }),
		toImperial: (value) => ({ value, unit: "tsp" }),
	},
];

export type MeasurementSystem = "metric" | "imperial";

function parseAmount(measure: string): { value: number; unit: string } | null {
	const cleanMeasure = measure.trim().replace(/\s+/g, " ");

	// Match patterns like "1/4 cup", "1 1/2 oz", "1.5 oz", "1/2 oz"
	const match = cleanMeasure.match(
		/^((?:\d+(?:\s+\d+\/\d+)?|\d+\/\d+))\s*(.+)$/
	);
	if (!match) return null;

	let [_, amount, unit] = match;
	let value: number;

	// Handle mixed numbers like "1 1/2"
	if (amount.includes(" ")) {
		const [whole, fraction] = amount.split(" ");
		const [num, denom] = fraction.split("/");
		value = Number(whole) + Number(num) / Number(denom);
	}
	// Handle simple fractions like "1/2"
	else if (amount.includes("/")) {
		const [num, denom] = amount.split("/");
		value = Number(num) / Number(denom);
	}
	// Handle decimal numbers
	else {
		value = Number(amount);
	}

	return {
		value,
		unit: unit.toLowerCase().trim(),
	};
}

export function convertMeasurement(
	measure: string | null,
	targetSystem: MeasurementSystem
): string {
	if (!measure) return "";

	const parsed = parseAmount(measure);
	if (!parsed) return measure;

	const unit = units.find((u) => u.aliases.includes(parsed.unit));
	if (!unit) return measure;

	const converted =
		targetSystem === "metric"
			? unit.toMetric(parsed.value)
			: unit.toImperial(parsed.value);

	const roundedValue = Math.round(converted.value);

	// Convert to cl/dl if appropriate (metric only)
	if (targetSystem === "metric" && converted.unit === "ml") {
		if (roundedValue >= 100) {
			return `${Math.round(roundedValue / 100)} dl`;
		} else if (roundedValue >= 10) {
			return `${Math.round(roundedValue / 10)} cl`;
		}
	}

	return `${roundedValue} ${converted.unit}`;
}

export function formatMeasuredItem(
	item: string,
	targetSystem: MeasurementSystem
): string {
	const measurementUnits = [
		"oz",
		"cup",
		"cups",
		"spoon",
		"tsp",
		"tbsp",
		"tablespoon",
		"teaspoon",
	];

	// Look for measurement at the start of the string
	const measurePattern = new RegExp(
		`^(.*?\\b(?:${measurementUnits.join("|")})\\b)\\s+(.+)$`,
		"i"
	);
	const match = item.match(measurePattern);

	if (match) {
		const [_, measure, name] = match;
		return `${convertMeasurement(measure.trim(), targetSystem)} ${name}`;
	}

	return item;
}
