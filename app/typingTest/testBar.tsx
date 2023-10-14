import { useState, useCallback, useEffect, useRef } from "react";
import { BsFillClockFill } from "react-icons/bs";
import { TbLetterCase } from "react-icons/tb";

type TestBarProp = {
	themeSelectorOpen: boolean;
	borderColour: string;
	borderSelectColour: string;
	textColour: string;
	textHoverColour: string;
	hoverColour: string;
	textSelectColour: string;
};

function TestBar({
	themeSelectorOpen,
	borderColour,
	borderSelectColour,
	textColour,
	textHoverColour,
	hoverColour,
	textSelectColour,
}: TestBarProp) {
	const [testType, setTestType] = useState(true);
	const [timeSelected, setTimeSelected] = useState(15);
	const [wordSelected, setWordSelected] = useState(15);



	const modifiedOuterDivClass = `flex flex-row justify-center gap-0 w-[700px] h-10 rounded-md opacity-100 transition-opacity duration-200 scale-75`;
	const modifiedInnerDiv1Class = `flex flex-row h-full w-1/2 items-center justify-center group ${borderColour} `;
	const modifiedInnerDiv2Class = `flex flex-row h-full w-1/2 items-center justify-center group border-2 ${borderColour} `;
	const testTypeClass = `flex w-1/2 h-full items-center justify-center gap-4 `;
	const firstClass = " rounded-l-lg";
	const lastClass = " rounded-r-lg";

	const buttonClass = `outline-none h-full w-1/4 text-center ${textColour} ${textHoverColour}`;
	
	const timeClass1 = ` ${timeSelected === 15 ? textSelectColour: textColour}`;
	const timeClass2 = ` ${timeSelected === 30 ? textSelectColour: textColour}`;
	const timeClass3 = ` ${timeSelected === 60 ? textSelectColour: textColour}`;
	const timeClass4 = ` ${timeSelected === 120 ? textSelectColour: textColour}`;

	const wordClass1 = ` ${wordSelected === 10 ? textSelectColour: textColour}`;
	const wordClass2 = ` ${wordSelected === 25 ? textSelectColour: textColour}`;
	const wordClass3 = ` ${wordSelected === 50 ? textSelectColour: textColour}`;
	const wordClass4 = ` ${wordSelected === 100 ? textSelectColour: textColour}`;

	const timeDiv = `border-2 ${testType ? textSelectColour : textColour} ${
		testType ? borderSelectColour : borderColour
	} ${hoverColour}`;
	const wordDiv = `border-2 ${testType ? textColour: textSelectColour} ${
		testType ? borderColour : borderSelectColour 
	}  ${hoverColour}`;


	const textSelectorRef = useRef(null);

	const handleVisibility = useCallback((event: MouseEvent | KeyboardEvent) => {
		if (textSelectorRef.current) {
			const textSelectorDiv = textSelectorRef.current as HTMLDivElement;

			if (event.type === "keydown") {
				textSelectorDiv.classList.add("opacity-0");
				textSelectorDiv.classList.remove("opacity-100");
			} else if (event.type === "mousemove") {
				textSelectorDiv.classList.add("opacity-100");
				textSelectorDiv.classList.remove("opacity-0");
			}
		}
	}, []);

	const handleTimeTest = useCallback(() => {
		setTestType(true);
	}, []);

	const handleWordTest = useCallback(() => {
		setTestType(false);

	}, []);

	useEffect(() => {
		if (!themeSelectorOpen) {
			document.addEventListener("keydown", handleVisibility);
			document.addEventListener("mousemove", handleVisibility);

			return () => {
				document.removeEventListener("keydown", handleVisibility);
				document.addEventListener("mousemove", handleVisibility);
			};
		}
	}, [handleVisibility, themeSelectorOpen]);

	return (
		<div ref={textSelectorRef} className={modifiedOuterDivClass}>
			<div className={modifiedInnerDiv1Class}>
				<div className={testTypeClass + timeDiv + firstClass} onClick={handleTimeTest}>
					<BsFillClockFill />
					<button className="outline-none">time</button>
				</div>

				<div className={testTypeClass + wordDiv} onClick={handleWordTest}>
					<TbLetterCase />
					<button className="outline-none">words</button>
				</div>
			</div>

			{testType ? (
			<div className={modifiedInnerDiv2Class + lastClass}>
				<button className={buttonClass + timeClass1} onClick={() => {return setTimeSelected(15)}}>15</button>
				<button className={buttonClass + timeClass2} onClick={() => {return setTimeSelected(30)}}>30</button>
				<button className={buttonClass + timeClass3} onClick={() => {return setTimeSelected(60)}}>60</button>
				<button className={buttonClass + timeClass4} onClick={() => {return setTimeSelected(120)}}>120</button>
			</div>
			) : (
				<div className={modifiedInnerDiv2Class + lastClass}>
				<button className={buttonClass + wordClass1} onClick={() => {return setWordSelected(10)}}>10</button>
				<button className={buttonClass + wordClass2} onClick={() => {return setWordSelected(25)}}>25</button>
				<button className={buttonClass + wordClass3} onClick={() => {return setWordSelected(50)}}>50</button>
				<button className={buttonClass + wordClass4} onClick={() => {return setWordSelected(100)}}>100</button>
				</div>
			)}
		</div>
	);
}

export default TestBar;
