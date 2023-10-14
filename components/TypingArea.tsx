"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Caret from "./Caret";
import { v4 as uuid } from "uuid";
import TextSelectorBar from "./TextSelectorBar";

type textAreaProp = {
	displayTextSelector?: boolean;
	themeOpen: boolean;
	textColour: string;
	textColourCorrect: string;
	textColourIncorrect: string;
	selectorBorderColour: string;
	selectorBorderSelectedColour: string;
	selectorTextColour: string;
	selectorHoverColour: string;
	selectorTextSelectedColour: string;
	selectorSvgColour: string;
	selectorSvgSelectedColour: string;
	selectorSvgHoverColour: string;
	caretColour: string;
	wordCountColour: string;
};

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
	themeOpen,
	textColour,
	textColourCorrect,
	textColourIncorrect,
	selectorBorderColour,
	selectorBorderSelectedColour,
	selectorTextColour,
	selectorTextSelectedColour,
	selectorHoverColour,
	selectorSvgColour,
	selectorSvgSelectedColour,
	selectorSvgHoverColour,
	caretColour,
	wordCountColour,
}: textAreaProp) {
	const initialCursorX = -561;
	const initialCursorY = 137;
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

	const [punc, setPunc] = useState(false);
	const [num, setNum] = useState(false);
	const [caps, setCaps] = useState(false);

	const [hydrated, setHydrated] = useState(false);
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

	useEffect(() => {
		setHydrated(true);
	}, []);

	const moveCursor = useCallback(() => {
		if (cursorRef.current) {
			cursorRef.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
		}
	}, [translateX, translateY]);

	const handlePuncChange = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLButtonElement;
		setPunc((currPunc) => {
			return !currPunc;
		});
	};

	const handleNumChange = () => {
		setNum((currNum) => {
			return !currNum;
		});
	};

	const handleCapsChange = () => {
		setCaps((currCaps) => {
			return !currCaps;
		});
	};

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
	}, [punc, num, caps, CreateFinalDiv, initialCursorY, initialCursorX]);

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
	}, [textDivRef, finalDiv, spaceChar]);

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

	const modifiedClass = `flex flex-col items-start gap-2 justify-center text-2xl tracking-widest w-full h-fit text-left ml-20`;
	const wordCountClass = `absolute text-2xl top-24 -left-3 translate-x-14 invisible ${wordCountColour}`;
	return (
		<div className="flex flex-col items-center justify-start gap-24 w-[1200px]">
			<TextSelectorBar
				themeSelectorOpen={themeOpen}
				puncChangeFunc={handlePuncChange}
				numChangeFunc={handleNumChange}
				capsChangeFunc={handleCapsChange}
				puncState={punc}
				numState={num}
				capsState={caps}
				borderColour={selectorBorderColour}
				borderSelectColour={selectorBorderSelectedColour}
				textColour={selectorTextColour}
				textSelectColour={selectorTextSelectedColour}
				hoverColour={selectorHoverColour}
				svgColour={selectorSvgColour}
				svgSelectColour={selectorSvgSelectedColour}
				svgHoverColour={selectorSvgHoverColour}
			/>

			<div ref={textDivRef} className={modifiedClass}>
				{...finalDiv}
			</div>

			<Caret
				translateX={translateX}
				translateY={translateY}
				colour={caretColour}
			/>

			<div ref={wordCountRef} className={wordCountClass}>
				{wordCount} / {totalWords}
			</div>

			<div className="absolute flex flex-row items-start gap-5 w-fit text-base text-dolphin-bright -top-10 left-0 invisible">
				<div>Speed: {speed}wpm</div>
				<div>Accuracy: {accuracy}%</div>
			</div>
		</div>
	);
}

export default TypingArea;
