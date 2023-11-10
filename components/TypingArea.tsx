"use client";

import { useRef, useState, useEffect, useCallback, useContext } from "react";
import Caret from "@/components/Caret";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/reduxStore/store";
import {
	incrementTotalChar,
	incrementCorrectChar,
	resetTimeAccuracy,
} from "@/app/reduxStore/speedAccuracySlice";

import { Merriweather_Sans } from "next/font/google";
const font = Merriweather_Sans({ subsets: ["latin"] });

type textAreaProp = {
	hydrated: boolean;
	setHydrated: any;
	displayTextSelector?: boolean;
	themeOpen: boolean;
	textColour: string;
	textColourCorrect: string;
	textColourIncorrect: string;
	caretColour: string;
	wordCountColour: string;
};

type Gram = {
	[key: string]: {
	  [probability: number]: string;
	};
  };

var grams: Gram = {
	" ": {
		0.6294: "s",
		1.0: "t",
		0.5166: "i",
		0.2635: "c",
		0.1255: "h",
		0.7882: "a",
		0.4297: "w",
		0.1915: "b",
		0.3464: "o",
		0.0603: "f",
	},
	a: {
		1.0: "n",
		0.507: "l",
		0.1379: "i",
		0.3973: " ",
		0.0446: "y",
		0.6368: "r",
		0.1865: "c",
		0.0895: "m",
		0.2906: "s",
		0.7853: "t",
	},
	c: {
		1.0: "o",
		0.078: "r",
		0.7882: "h",
		0.3303: "t",
		0.6334: "e",
		0.181: "i",
		0.0365: " ",
		0.4808: "a",
		0.2455: "k",
		0.1214: "l",
	},
	b: {
		1.0: "e",
		0.0168: "s",
		0.5666: "o",
		0.3311: "l",
		0.7064: "a",
		0.042: " ",
		0.2285: "i",
		0.1634: "r",
		0.1023: "y",
		0.445: "u",
	},
	e: {
		1.0: " ",
		0.3763: "s",
		0.2035: "a",
		0.2859: "d",
		0.0326: "c",
		0.6218: "r",
		0.1016: "e",
		0.0666: "t",
		0.14: "l",
		0.4732: "n",
	},
	d: {
		0.4397: "e",
		1.0: " ",
		0.0217: "d",
		0.0671: "u",
		0.044: "r",
		0.0109: "y",
		0.2946: "i",
		0.0974: "s",
		0.1495: "a",
		0.2076: "o",
	},
	g: {
		0.4683: "h",
		1.0: " ",
		0.0461: "s",
		0.3648: "o",
		0.0214: "n",
		0.1991: "r",
		0.2811: "a",
		0.0805: "u",
		0.1315: "i",
		0.6221: "e",
	},
	f: {
		0.1547: "a",
		1.0: " ",
		0.0923: "t",
		0.0555: "u",
		0.3867: "e",
		0.2186: "f",
		0.2981: "r",
		0.0235: "l",
		0.5046: "i",
		0.7035: "o",
	},
	i: {
		0.125: "e",
		1.0: "n",
		0.5324: "s",
		0.1826: "d",
		0.4017: "c",
		0.3255: "o",
		0.6677: "t",
		0.2528: "l",
		0.0382: "g",
		0.081: "r",
	},
	h: {
		0.0636: "t",
		1.0: "e",
		0.0099: "y",
		0.3911: "i",
		0.0382: "r",
		0.0043: "n",
		0.1563: "o",
		0.2699: " ",
		0.0219: "u",
		0.5663: "a",
	},
	k: {
		1.0: "e",
		0.0184: "y",
		0.2099: "s",
		0.0336: "o",
		0.1346: "n",
		0.0828: "a",
		0.664: " ",
		0.0066: "u",
		0.0526: "l",
		0.3508: "i",
	},
	j: {
		0.3455: "a",
		1.0: "u",
		0.0009: "s",
		0.0314: " ",
		0.2002: "e",
		0.0618: "i",
		0.0051: "p",
		0.0021: "c",
		0.6376: "o",
		0.0132: "r",
	},
	m: {
		1.0: "e",
		0.7376: "a",
		0.0544: "b",
		0.2917: "i",
		0.1154: "u",
		0.4078: "o",
		0.0265: "s",
		0.1847: "p",
		0.5582: " ",
		0.0833: "m",
	},
	l: {
		1.0: " ",
		0.8256: "e",
		0.0557: "s",
		0.5064: "i",
		0.2714: "o",
		0.0221: "u",
		0.1913: "y",
		0.6551: "l",
		0.3799: "a",
		0.1173: "d",
	},
	o: {
		0.4793: "u",
		1.0: "n",
		0.8009: " ",
		0.0373: "o",
		0.3502: "f",
		0.1282: "w",
		0.0817: "l",
		0.1832: "t",
		0.6375: "r",
		0.2536: "m",
	},
	n: {
		1.0: " ",
		0.5597: "g",
		0.4228: "t",
		0.1167: "i",
		0.3088: "e",
		0.7117: "d",
		0.2199: "s",
		0.0764: "c",
		0.0377: "a",
		0.1673: "o",
	},
	q: {
		1.0: "u",
		0.0059: "l",
		0.0136: "b",
		0.0017: "s",
		0.0348: "i",
		0.0218: "a",
		0.003: "w",
		0.0043: "w",
		0.0006: "v",
		0.0888: " ",
	},
	p: {
		1.0: "e",
		0.18: "i",
		0.5315: "a",
		0.4013: "l",
		0.8133: "r",
		0.124: "p",
		0.2815: " ",
		0.0687: "u",
		0.6631: "o",
		0.0274: "t",
	},
	s: {
		1.0: " ",
		0.2935: "i",
		0.1824: "a",
		0.3978: "e",
		0.5411: "t",
		0.0947: "s",
		0.1379: "h",
		0.053: "u",
		0.0224: "p",
		0.2328: "o",
	},
	r: {
		1.0: "e",
		0.1439: "t",
		0.0554: "d",
		0.2183: "s",
		0.0245: "n",
		0.5049: "o",
		0.7461: " ",
		0.0896: "y",
		0.4002: "i",
		0.3042: "a",
	},
	u: {
		1.0: "r",
		0.5156: "s",
		0.2004: " ",
		0.3647: "l",
		0.259: "p",
		0.1475: "c",
		0.6674: "n",
		0.0476: "e",
		0.8267: "t",
		0.0963: "g",
	},
	t: {
		0.1525: "a",
		0.0368: "u",
		1.0: "h",
		0.1056: "r",
		0.4593: "o",
		0.071: "s",
		0.3457: "e",
		0.7133: " ",
		0.0183: "t",
		0.243: "i",
	},
	w: {
		0.0373: "s",
		0.0059: "l",
		0.8036: "a",
		1.0: "i",
		0.6122: "e",
		0.3096: "o",
		0.1913: " ",
		0.0183: "r",
		0.4543: "h",
		0.0822: "n",
	},
	v: {
		1.0: "e",
		0.007: "s",
		0.0014: "d",
		0.0737: "o",
		0.0234: " ",
		0.0029: "r",
		0.1484: "a",
		0.0112: "y",
		0.339: "i",
		0.0045: "u",
	},
	y: {
		0.204: "e",
		1.0: " ",
		0.0681: "i",
		0.0136: "l",
		0.0314: "t",
		0.0223: "m",
		0.303: "o",
		0.0475: "a",
		0.0056: "p",
		0.1217: "s",
	},
	x: {
		1.0: "p",
		0.7464: " ",
		0.0368: "u",
		0.2706: "i",
		0.1089: "c",
		0.0215: "h",
		0.01: "o",
		0.5265: "t",
		0.1895: "e",
		0.3517: "i",
	},
	z: {
		1.0: "e",
		0.4678: " ",
		0.2055: "o",
		0.3289: "i",
		0.0684: "y",
		0.043: "u",
		0.0075: "h",
		0.024: "l",
		0.6314: "a",
		0.1182: "z",
	},
};
// create a sorted list for all keys
// for (var key in grams) {
// 	var sorted = [];
// 	for (var p in grams[key]) sorted.push(p);
// 	grams[key].sorted = sorted.sort();
// }

// function generateWords(n) {
// 	if (!n) {
// 		n = 1;
// 	}
// 	var words = [];
// 	for (var i = 0; i < n; i++) {
// 		var w = " ";
// 		// last will be our 1gram used to find a proper follower
// 		var last = w;
// 		while (true) {
// 			var rand = Math.random();
// 			var p_list = grams[last].sorted;
// 			// find the follower corresponding to the random number
// 			// Note: p_list containes the accumulated probabilities of
// 			// the followers.
// 			for (var k = 0; k + 1 < p_list.length && p_list[k] < rand; k++);

// 			char = grams[last][p_list[k]];
// 			if (char === " ") {
// 				// space indicates end, but we do not want words shorter
// 				// than 5 so make sure we have minimum length
// 				if (w.length > 5) break;
// 			} else {
// 				w += char;
// 			}
// 			last = char;
// 		}
// 		// strip the leading space before appending to the list
// 		words.push(w.substring(1));
// 	}
// 	return words;
// }

function CharacterSeparator(lineList: Array<Array<string>>) {
	let charList = [];

	for (let i = 0; i < lineList.length; i++) {
		let charListLine = [];

		for (let j of lineList[i]) {
			for (let k of j) charListLine.push(k);
		}
		charList.push(charListLine);
	}

	return charList;
}

function LineSeparator(wordList: Array<string>, charCount: number) {
	let counter = 0;
	let lineList = [];
	let len = wordList.length;
	let prevIndex = 0;

	for (let i = 0; i < len; i++) {
		for (let j = 0; j < wordList[i].length; j++) {
			counter++;

			if (counter == charCount) {
				let line = wordList.slice(prevIndex, i);

				if (line[line.length - 1] === " ") line.pop();

				if (line[0] == " ") line = line.slice(1);

				lineList.push(line);
				counter = j;
				prevIndex = i;
			}
		}
	}

	return lineList;
}

function FinalDiv(
	wordCount: number,
	lineCount: number,
	charCount: number,
	textColour: string,
	isPunc: boolean,
	isNum: boolean,
	isCaps: boolean
) {
	const randomWords = [
		"apple",
		"banana",
		"chocolate",
		"dog",
		"elephant",
		"flower",
		"guitar",
		"happiness",
		"internet",
		"jazz",
		"kangaroo",
		"lighthouse",
		"mountain",
		"notebook",
		"ocean",
		"penguin",
		"quasar",
		"rainbow",
		"sunset",
		"tiger",
		"umbrella",
		"volcano",
		"watermelon",
		"xylophone",
		"yogurt",
		"zeppelin",
	];
	const randomPunc = ["?", "!", ",", ".", "'", ";", ":", ")"];
	// let wordCount = 36; //36
	// let lineCount = 4; //4
	// let charCount = 60; //60
	let wordList = [];
	const spaceChar = "&ensp;"; //8194

	for (let i = 0; i < wordCount; i++) {
		let randomWordIndex = Math.floor(Math.random() * randomWords.length);
		let randomPuncIndex = Math.floor(Math.random() * randomPunc.length);

		let word = randomWords[randomWordIndex];
		let punctuation = randomPunc[randomPuncIndex];
		let number = Math.floor(Math.random() * 10000);

		let puncRandom = Math.floor(Math.random() * 5);
		let capsRandom = Math.floor(Math.random() * 5);
		let numRandom = Math.floor(Math.random() * 5);

		if (isCaps && capsRandom === 4) {
			word = word[0].toUpperCase() + word.slice(1);
		}

		if (isPunc && puncRandom === 4) {
			word += punctuation;

			if (punctuation === "'") word = punctuation + word;

			if (punctuation === ")") word = "(" + word;
		}

		if (isNum && numRandom === 4) word = number.toString();

		wordList.push(word);
		wordList.push(" ");
	}

	let lineList = LineSeparator(wordList, charCount).slice(0, lineCount);
	let finalList = CharacterSeparator(lineList);
	finalList = finalList.map((row) => {
		return row.map((str) => {
			return str.replace(" ", spaceChar);
		});
	});

	const modifiedClass = `${textColour}`;

	let finalDiv = finalList.map((subArray) => {
		let subSpan = subArray.map((character) => {
			if (character === spaceChar) {
				return (
					<span
						className={`${textColour}`}
						key={uuid()}
						dangerouslySetInnerHTML={{ __html: spaceChar }}
					></span>
				);
			} else {
				return (
					<span className={`${textColour}`} key={uuid()}>
						{character}
					</span>
				);
			}
		});

		return (
			<span className="w-fit" key={uuid()}>
				{/* {""} */}
				{subSpan} {/*{" "}*/}
			</span>
		);
	});

	return finalDiv;
}

function TypingArea({
	hydrated,
	setHydrated,
	themeOpen,
	textColour,
	textColourCorrect,
	textColourIncorrect,
	caretColour,
	wordCountColour,
}: textAreaProp) {
	const initialCursorX = -561;
	const initialCursorY = 0;
	const changeCursorY = 40;

	const words = 100;
	const lines = 3;
	const chars = 75;

	const CreateFinalDiv = useCallback(
		(isPunc: boolean, isNum: boolean, isCaps: boolean) => {
			return FinalDiv(words, lines, chars, textColour, isPunc, isNum, isCaps);
		},
		[textColour]
	);

	const punc = useSelector((state: RootState) => state.selector.punc);
	const num = useSelector((state: RootState) => state.selector.num);
	const caps = useSelector((state: RootState) => state.selector.caps);

	const [finalDiv, setFinalDiv] = useState(() =>
		CreateFinalDiv(punc, num, caps)
	);
	const [finalDivSpans, setFinalDivSpans] = useState<HTMLSpanElement[][]>([]);
	const [translateX, setTranslateX] = useState(initialCursorX);
	const [translateY, setTranslateY] = useState(initialCursorY); //-133 -97
	const [widthList, setWidthList] = useState<any>([]);
	const [jumpIndex, setJumpIndex] = useState(0);
	const [lineIndex, setLineIndex] = useState(0);
	const [totalWords, setTotalWords] = useState(0);
	const [wordCount, setWordCount] = useState(0);
	const [speed, setSpeed] = useState(0);
	const [accuracy, setAccuracy] = useState(0);

	const textDivRef = useRef<HTMLDivElement | null>(null);
	const cursorRef = useRef<HTMLDivElement>(null);
	const isWrongRef = useRef(false);
	const wordCountRef = useRef(null);
	const startTimeRef = useRef<number | null>(null);
	const endTimeRef = useRef<number | null>(null);
	const charCountRef = useRef(0);
	const correctCharCountRef = useRef(0);

	const spaceChar = String.fromCharCode(8194);
	const coundownTime = useSelector((state: RootState) => state.countdown);
	const refresher = useSelector((state: RootState) => state.refresh);

	const dispatch = useDispatch();

	useEffect(() => {
		setHydrated(true);
	}, [setHydrated]);

	const moveCursor = useCallback(() => {
		if (cursorRef.current) {
			cursorRef.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
		}
	}, [translateX, translateY]);

	useEffect(() => {
		setFinalDiv(() => {
			if (wordCountRef.current) {
				const wordCountDiv = wordCountRef.current as HTMLDivElement;
				wordCountDiv.classList.add("invisible");
			}

			endTimeRef.current = Date.now();

			if (
				startTimeRef.current &&
				endTimeRef.current &&
				correctCharCountRef.current
			) {
				const acc = parseFloat(
					((correctCharCountRef.current / charCountRef.current) * 100).toFixed(
						2
					)
				);
				const wpm = parseFloat(
					(
						charCountRef.current /
						((endTimeRef.current - startTimeRef.current) / 12000)
					).toFixed(2)
				);
				setAccuracy(acc);
				setSpeed(wpm);
				startTimeRef.current = null;
				endTimeRef.current = null;
			}

			return CreateFinalDiv(punc, num, caps);
		});

		setTranslateX(initialCursorX);
		setTranslateY(initialCursorY);
		setJumpIndex(0);
		setLineIndex(0);
	}, [
		punc,
		num,
		caps,
		CreateFinalDiv,
		initialCursorY,
		initialCursorX,
		coundownTime,
	]);

	useEffect(() => {
		setFinalDiv(() => CreateFinalDiv(punc, num, caps));
		charCountRef.current = 0;
		correctCharCountRef.current = 0;
		startTimeRef.current = null;
		endTimeRef.current = null;
		dispatch(resetTimeAccuracy());
		setWordCount(0);
		setTranslateY(initialCursorY);
		setJumpIndex(0);
		setLineIndex(0);
		setTranslateX(initialCursorX);

		if (wordCountRef.current) {
			const wordCountDiv = wordCountRef.current as HTMLDivElement;
			wordCountDiv.classList.add("invisible");
		}
	}, [refresher, punc, num, caps, CreateFinalDiv, initialCursorX, dispatch]);

	useEffect(() => {
		moveCursor();
	}, [translateX, translateY, moveCursor]);

	useEffect(() => {
		const textDiv: HTMLDivElement | null = textDivRef.current;

		if (textDiv) {
			const outerSpans: any = textDiv.childNodes; // Select outer spans

			const newWidthList = Array.from(outerSpans).map((outerSpan: any) => {
				const innerSpans = outerSpan.getElementsByTagName("span"); // Select nested spans within the outer span
				const widths = Array.from(innerSpans).map(
					(span: any) => span.getBoundingClientRect().width
				);
				return widths;
			});

			const newFinalDivSpans = Array.from(outerSpans).map((outerSpan: any) => {
				return outerSpan.getElementsByTagName("span"); // Select nested spans within the outer span
			});

			let wordCount = 0;
			let charCount = 0;

			for (let i of outerSpans) {
				const spanList: any = i.childNodes;

				for (let j of spanList) {
					if (j.innerHTML === spaceChar) {
						wordCount++;
					}

					charCount++;
				}
				wordCount++;
			}

			charCountRef.current = charCount;
			setTotalWords(wordCount);
			setWidthList(newWidthList);
			setFinalDivSpans(newFinalDivSpans);
		}
	}, [textDivRef, finalDiv, spaceChar, refresher]);

	const handleKeyPress = useCallback(
		(event: KeyboardEvent) => {
			const currentLineWidthList = widthList[lineIndex];
			const currentLineText = finalDivSpans[lineIndex];
			const curSpan =
				currentLineText && jumpIndex < currentLineText.length
					? currentLineText[jumpIndex]
					: undefined;
			const pattern = /^[a-zA-Z0-9\s`~!@#$%^&*()_+={[}\]:;"'<,>.?/\\|,-]$/;

			if (event.key === " ") event.preventDefault();

			if (
				(event.key === "Enter" && jumpIndex === currentLineWidthList.length) ||
				(curSpan && event.key === curSpan.innerHTML) ||
				(curSpan && event.key === " " && curSpan.innerHTML === spaceChar)
			) {
				if (
					(curSpan &&
						event.key === " " &&
						curSpan.innerHTML === String.fromCharCode(8194)) ||
					(event.key === "Enter" && jumpIndex === currentLineWidthList.length)
				) {
					setWordCount((curWordCount) => {
						return curWordCount + 1;
					});
				}

				if (isWrongRef.current) {
					curSpan?.classList.add(textColourIncorrect);
					curSpan?.classList.remove(textColour);
				} else curSpan?.classList.add(textColourCorrect);
				curSpan?.classList.remove(textColour);

				if (isWrongRef.current === false) {
					dispatch(incrementCorrectChar());
				}
				dispatch(incrementTotalChar());

				isWrongRef.current = false;
				correctCharCountRef.current += 1;

				if (currentLineWidthList && currentLineWidthList.length >= jumpIndex) {
					setJumpIndex((curIndex) => {
						return curIndex + 1;
					});

					setTranslateX((prevTranslateX) => {
						return prevTranslateX + currentLineWidthList[jumpIndex];
					});

					if (jumpIndex >= currentLineWidthList.length) {
						setJumpIndex(0);
						setLineIndex((curLineIndex) => {
							return curLineIndex + 1;
						});

						if (lineIndex < widthList.length - 1) {
							setTranslateY((prevTranslateY) => {
								return prevTranslateY + changeCursorY;
							});
						} else {
							setFinalDiv(() => {
								if (wordCountRef.current) {
									const wordCountDiv = wordCountRef.current as HTMLDivElement;
									wordCountDiv.classList.add("invisible");
								}

								endTimeRef.current = Date.now();

								if (
									startTimeRef.current &&
									endTimeRef.current &&
									correctCharCountRef.current
								) {
									const acc = parseFloat(
										(
											(correctCharCountRef.current / charCountRef.current) *
											100
										).toFixed(2)
									);
									const wpm = parseFloat(
										(
											charCountRef.current /
											((endTimeRef.current - startTimeRef.current) / 12000)
										).toFixed(2)
									);
									setAccuracy(acc);
									setSpeed(wpm);
									startTimeRef.current = null;
									endTimeRef.current = null;
								}

								return CreateFinalDiv(punc, num, caps);
							});

							setTranslateY(initialCursorY);
							setJumpIndex(0);
							setLineIndex(0);
							setWordCount(0);
						}

						setTranslateX(initialCursorX);
					}
				}
			} else if (pattern.test(event.key)) {
				isWrongRef.current = true;
			}

			if (
				wordCountRef.current &&
				pattern.test(event.key) &&
				!startTimeRef.current
			) {
				const wordCountDiv = wordCountRef.current as HTMLDivElement;
				wordCountDiv.classList.remove("invisible");
				startTimeRef.current = Date.now();
			}
		},
		[
			widthList,
			lineIndex,
			finalDivSpans,
			jumpIndex,
			textColour,
			textColourIncorrect,
			textColourCorrect,
			punc,
			num,
			caps,
			initialCursorX,
			initialCursorY,
			setTranslateX,
			setTranslateY,
			setLineIndex,
			setJumpIndex,
			setWordCount,
			setFinalDiv,
			CreateFinalDiv,
			spaceChar,
			dispatch,
		]
	);

	useEffect(() => {
		if (!themeOpen) {
			document.addEventListener("keydown", handleKeyPress);

			return () => {
				document.removeEventListener("keydown", handleKeyPress);
			};
		}
	}, [widthList, jumpIndex, lineIndex, handleKeyPress, themeOpen]);

	if (!hydrated) {
		// Returns null on first render, so the client and server match
		return null;
	}

	return (
		<main
			className={`${font.className} flex flex-col items-center justify-start gap-24 w-[1200px]`}
		>
			<div
				ref={textDivRef}
				className={`flex flex-col items-start gap-2 justify-center text-2xl tracking-widest w-full h-fit text-left ml-20`}
			>
				{...finalDiv}
			</div>

			<Caret
				translateX={translateX}
				translateY={translateY}
				colour={caretColour}
			/>

			<div
				ref={wordCountRef}
				className={`absolute text-2xl -top-10 -left-5 translate-x-14 invisible ${wordCountColour}`}
			>
				{wordCount} / {totalWords}
			</div>

			<div className="absolute flex flex-row items-start gap-5 w-fit text-base text-dolphin-bright top-0 left-0 invisible">
				<div>Speed: {speed}wpm</div>
				<div>Accuracy: {accuracy}%</div>
			</div>
		</main>
	);
}

export default TypingArea;
