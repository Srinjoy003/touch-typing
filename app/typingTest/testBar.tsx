import { useState, useCallback, useEffect, useRef } from "react";
import { BsFillClockFill } from "react-icons/bs";
import { TbLetterCase }  from "react-icons/tb";

type TestBarProp = {
	themeSelectorOpen: boolean;
	borderColour: string;
	borderSelectColour: string;
	textColour: string;
	hoverColour: string;
	textSelectColour: string;
	svgColour: string;
	svgSelectColour: string;
	svgHoverColour: string;
};

function TestBar({
	themeSelectorOpen,
	borderColour,
	borderSelectColour,
	textColour,
	hoverColour,
	textSelectColour,
	svgColour,
	svgSelectColour,
	svgHoverColour,
}: TestBarProp) {

	const [timeTest, setTimeTest] = useState(false);
	const [wordTest, setwordTest] = useState(false);
	const modifiedOuterDivClass = `flex flex-row justify-center gap-0 w-[700px] h-10 rounded-md opacity-100 transition-opacity duration-200 scale-75`;
	const modifiedInnerDivClass = `flex flex-row gap-5 h-full w-1/2 items-center justify-center group border-2 ${hoverColour} `;
	const testTypeClass = `flex gap-3 items-center border-dolphin-navbar `;
	const firstClass = " rounded-l-lg";
	const lastClass = " rounded-r-lg";

	
	const timeDivColour = `${timeTest ? textSelectColour : textColour} ${
		timeTest ? borderSelectColour : borderColour
	}`;
	const wordDivColour = `${wordTest ? textSelectColour : textColour} ${
		wordTest ? borderSelectColour : borderColour
	}`;

	const timeSvgColour = `${timeTest ? svgSelectColour : svgColour}`;
	const wordSvgColour = `${wordTest ? svgSelectColour : svgColour}`;

	const modifiedSvgClass = `${svgHoverColour} `;

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
			<div
				className={modifiedInnerDivClass + firstClass}
			>
				
				<div className={testTypeClass + timeDivColour}>
					<BsFillClockFill />
					<button className="outline-none">time</button>
				</div>
				

				<div className={testTypeClass + wordDivColour}>
					<TbLetterCase />
					<button className="outline-none">words</button>
				</div>


			</div>
			<div
				className={modifiedInnerDivClass + lastClass}
			>
				<button className="outline-none">100 chars</button>
				<button className="outline-none">500 chars</button>
				<button className="outline-none">1000 chars</button>
				<button className="outline-none">15s</button>
				<button className="outline-none">30s</button>
				<button className="outline-none">60s</button>
			</div>
		
		</div>
	);
}

export default TestBar;
