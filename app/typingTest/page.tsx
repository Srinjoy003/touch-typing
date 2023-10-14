"use client";
import TypingArea from "@/components/TypingArea";
import Keyboard from "@/components/Keyboard";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";
import { useState } from "react";
import TestBar from "./testBar";
import Timer from "./Timer";

function Home() {
	const [isOpen, setIsOpen] = useState(false);
	const [theme, setTheme] = useState("dolphin");

	return (
		<div
			className={`bg-${theme}-bg flex flex-row items-center justify-end w-full h-full gap-32`}
		>
			<Logo textColour={`${theme}-bright`} secondaryColour={`${theme}-main`} />

			<div className="flex flex-col items-start h-fit justify-start gap-28 translate-y-10 translate-x-20">
				<div>
					<TestBar
						themeSelectorOpen={isOpen}
						borderColour={`border-${theme}-navbar`}
						borderSelectColour={`border-${theme}-main`}
						textColour={`text-${theme}-dull`}
						textSelectColour={`text-${theme}-main`}
						hoverColour={`hover:text-${theme}-bright hover:border-${theme}-dull hover:bg-${theme}-navbar`}
						svgColour={`fill-${theme}-dull`}
						svgSelectColour={`fill-${theme}-main`}
						svgHoverColour={`group-hover:fill-${theme}-bright`}			
					/>
					{/* <Timer /> */}
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
				themeSelectorBackgroundTheme={`bg-${theme}-bg text-${theme}-dull hover:bg-slate-300 aria-selected:bg-${theme}-bright aria-selected:text-${theme}-bg`}
				themeSelectorBackgroundHoverTheme=""
				themeSelectorTextTheme=""
				themeSelectorTextHoverTheme=""
			/>
		</div>
	);
}

export default Home;
