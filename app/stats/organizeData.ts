type TimeStats = {
	[key: number]: {
		_id: string;
		avgSpeed: number;
		avgAccuracy: number;
	};
};

type WordStats = {
	[key: number]: {
		_id: string;
		avgSpeed: number;
		avgAccuracy: number;
	};
};

type DetailedStats = {
	testTaken: number;
	totalChar: number;
	totalWords: number;
	highestSpeed: number;
	avgSpeed: number;
	highestAccuracy: number;
	avgAccuracy: number;
	avgSpeedLast10: number;
	avgAccuracyLast10: number;
};

type LastEntries = {
	accuracy: number;
	correctChar: number;
	createdAt: string; // Assuming createdAt is always a string in ISO 8601 format
	errorChar: number;
	mode: string;
	rawSpeed: number;
	speed: number;
	totalChars: number;
	username: string;
	wordCount: number;
	__v: number;
	_id: string;
}[];

export type ProfileStats = {
	testTaken: number;
	avgSpeed: number;
	avgAccuracy: number;
};

export type TableStats = {
	wpm: string;
	raw: string;
	accuracy: string;
	chars: string;
	mode: string;
	date: string;
}[];

export type DataSet = {
	timeStats: TimeStats;
	wordStats: WordStats;
	detailedStats: DetailedStats;
	lastEntries: LastEntries;
	profileStats: ProfileStats;
};

type TestStat = {
	value: string;
	speed: string;
	accuracy: string;
}[];

type DetailedStatMap = {
	"tests taken": string;
	"words typed": string;
	"characters typed": string;
	"highest wpm": string;
	"average wpm": string;
	"average wpm(last 10 tests)": string;
	"highest accuracy": string;
	"average accuracy": string;
	"average accuracy(last 10 tests)": string;
};

type Label =
	| "tests taken"
	| "words typed"
	| "characters typed"
	| "highest wpm"
	| "average wpm"
	| "average wpm(last 10 tests)"
	| "highest accuracy"
	| "average accuracy"
	| "average accuracy(last 10 tests)";

const timeTestStats = [
	{ value: 15, speed: 20, accuracy: 90 },
	{ value: 30, speed: 30, accuracy: 100 },
	{ value: 60, speed: 80, accuracy: 90 },
	{ value: 120, speed: 20, accuracy: 90 },
];

const detailedStats = [
	[
		{ label: "tests taken", value: "10" },
		{ label: "words typed", value: "2000" },
		{ label: "characters typed", value: "100" },
	],
	[
		{ label: "highest wpm", value: "10" },
		{ label: "average wpm", value: "80" },
		{ label: "average wpm(last 10 tests)", value: "100" },
	],
	[
		{ label: "highest accuracy", value: "100%" },
		{ label: "average accuracy", value: "93%" },
		{ label: "average accuracy(last 10 tests)", value: "90%" },
	],
];

function CreateDetailedStats(detailedStats: DetailedStats) {
	const detailedStatsOutput: { label: Label; value: string }[][] = [
		[
			{ label: "tests taken", value: "10" },
			{ label: "words typed", value: "2000" },
			{ label: "characters typed", value: "100" },
		],
		[
			{ label: "highest wpm", value: "10" },
			{ label: "average wpm", value: "80" },
			{ label: "average wpm(last 10 tests)", value: "100" },
		],
		[
			{ label: "highest accuracy", value: "100%" },
			{ label: "average accuracy", value: "93%" },
			{ label: "average accuracy(last 10 tests)", value: "90%" },
		],
	];

	const detailedStatMap: DetailedStatMap = {
		"tests taken": detailedStats.testTaken.toString(),
		"words typed": detailedStats.totalWords.toString(),
		"characters typed": detailedStats.totalChar.toString(),
		"highest wpm": Math.round(detailedStats.highestSpeed).toString(),
		"average wpm": Math.round(detailedStats.avgSpeed).toString(),
		"average wpm(last 10 tests)": Math.round(
			detailedStats.avgSpeedLast10
		).toString(),
		"highest accuracy":
			Math.round(detailedStats.highestAccuracy).toString() + "%",
		"average accuracy": Math.round(detailedStats.avgAccuracy).toString() + "%",
		"average accuracy(last 10 tests)":
			Math.round(detailedStats.avgAccuracyLast10).toString() + "%",
	};

	for (let i = 0; i < detailedStatsOutput.length; i++) {
		for (let j = 0; j < detailedStatsOutput[i].length; j++) {
			const label: Label = detailedStatsOutput[i][j].label;
			detailedStatsOutput[i][j].value = detailedStatMap[label];
		}
	}

	return detailedStatsOutput;
}

function CreateLastEntries(lastEntries: LastEntries) {
	const tableStats: TableStats = [];

	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	for (let entry of lastEntries) {
		const date = new Date(entry.createdAt);
		const dateString = `${date.getDate()} ${
			months[date.getMonth()]
		} ${date.getFullYear()}`;
		const row = {
			wpm: entry.speed.toFixed(2),
			raw: entry.rawSpeed.toFixed(2),
			accuracy: entry.accuracy.toFixed(2) + "%",
			chars: `${entry.totalChars}/${entry.correctChar}/${entry.errorChar}`,
			mode: entry.mode,
			date: dateString,
		};
		tableStats.push(row);
	}

	return tableStats;
}

export function organizeData(dataSet: DataSet) {
	const { timeStats, wordStats, detailedStats, lastEntries, profileStats } =
		dataSet;

	const timeTestStats: TestStat = [];
	const wordTestStats: TestStat = [];
	const detailedTestStats = CreateDetailedStats(detailedStats);
	const tableStats = CreateLastEntries(lastEntries);

	const timeValues = [15, 30, 60, 120];
	const wordValues = [10, 25, 50, 100];

	for (let value of timeValues) {
		if (value in timeStats) {
			const data = {
				value: Number(value).toString(),
				speed: Math.round(timeStats[value].avgSpeed).toString(),
				accuracy: Math.round(timeStats[value].avgAccuracy).toString() + "%",
			};

			timeTestStats.push(data);
		} else {
			const data = {
				value: Number(value).toString(),
				speed: "-",
				accuracy: "-",
			};

			timeTestStats.push(data);
		}
	}

	for (let value of wordValues) {
		if (value in wordStats) {
			const data = {
				value: Number(value).toString(),
				speed: Math.round(wordStats[value].avgSpeed).toString(),
				accuracy: Math.round(wordStats[value].avgAccuracy).toString() + "%",
			};

			wordTestStats.push(data);
		} else {
			const data = {
				value: Number(value).toString(),
				speed: "-",
				accuracy: "-",
			};

			wordTestStats.push(data);
		}
	}

	const profileTestStats = {
		testTaken: profileStats.testTaken.toString(),
		avgSpeed: Math.round(profileStats.avgSpeed).toString(),
		avgAccuracy: Math.round(profileStats.avgAccuracy).toString() + "%",
	};

	const outputData = {
		timeTestStats,
		wordTestStats,
		detailedTestStats,
		tableStats,
		profileTestStats,
	};

	return outputData;
}
