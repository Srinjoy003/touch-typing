"use client";
import TypingArea from "@/components/TypingArea";
import Keyboard from "@/components/Keyboard";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";
import { useState } from "react";
import TestBar from "./testBar";
import Timer from "./Timer";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function Home() {
	const [isOpen, setIsOpen] = useState(false);
	const [theme, setTheme] = useState("dolphin");

	return (
		<div
			className={`bg-${theme}-bg flex flex-row items-center justify-end w-full h-full gap-32`}
		>
			<Logo textColour={`${theme}-bright`} secondaryColour={`${theme}-main`} />

			<div className="flex flex-col items-start h-fit justify-start gap-28 translate-y-10 translate-x-20">
				<div className="absolute">
					<TestBar
						themeSelectorOpen={isOpen}
						borderColour={`border-${theme}-navbar`}
						borderSelectColour={`border-${theme}-main`}
						textColour={`text-${theme}-dull`}
						textSelectColour={`text-${theme}-main`}
						hoverColour={`hover:text-${theme}-bright hover:border-${theme}-dull hover:bg-${theme}-navbar`}
						textHoverColour={`hover:text-${theme}-bright`}
					/>

					<CountdownCircleTimer
						isPlaying
						duration={10}
						colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
						colorsTime={[7, 5, 2, 0]}
						size={80}
						strokeWidth={2}
					>
						{({ remainingTime }) => remainingTime}
					</CountdownCircleTimer>
				</div>
				<div className={`translate-x-6 mb-10 translate-y-10`}>
					<TypingArea
						themeOpen={isOpen}
						textColour={`text-${theme}-dull`}
						textColourCorrect={`text-${theme}-bright`}
						textColourIncorrect={`text-${theme}-wrong`}
						selectorBorderColour={`border-${theme}-navbar`}
						selectorBorderSelectedColour={`border-${theme}-main`}
						selectorTextColour={`text-${theme}-dull`}
						selectorTextSelectedColour={`text-${theme}-main`}
						selectorHoverColour={`hover:text-${theme}-bright hover:border-${theme}-dull hover:bg-${theme}-navbar`}
						selectorSvgColour={`fill-${theme}-dull`}
						selectorSvgSelectedColour={`fill-${theme}-main`}
						selectorSvgHoverColour={`group-hover:fill-${theme}-bright`}
						caretColour={`border-${theme}-main`}
						wordCountColour={`text-${theme}-main`}
					/>
				</div>
				<div className="translate-x-10 translate-y-6 ml-24 scale-110">
					<Keyboard
						themeSelectorOpen={isOpen}
						theme={`bg-${theme}-bg`}
						funcTheme={`bg-${theme}-bg`}
						pressedTheme={`bg-${theme}-dull`}
						backgroundTheme={`bg-${theme}-navbar`}
						textColour={`text-${theme}-dull`}
						textPressedColour={`text-${theme}-mono`}
					/>
				</div>
			</div>
			<Navbar
				setTheme={setTheme}
				themeOpen={isOpen}
				setThemeOpen={setIsOpen}
				textColour={`text-${theme}-dull`}
				borderTheme={`border-${theme}-navbar`}
				svgFill={`fill-${theme}-dull group-hover:fill-${theme}-bright`}
				hoverColour={`hover:bg-${theme}-navbar hover:border-${theme}-dull hover:text-${theme}-bright `}
				themeSelectorColour={`bg-${theme}-bg text-${theme}-dull hover:bg-slate-300 aria-selected:bg-${theme}-bright aria-selected:text-${theme}-bg`}
			/>
		</div>
	);
}

export default Home;
