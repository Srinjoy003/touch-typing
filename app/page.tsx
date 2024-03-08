"use client";
import TypingArea from "@/app/components/TypingArea";
import Keyboard from "@/app/components/Keyboard";
import Navbar from "@/app/components/Navbar";
import Logo from "@/app/components/Logo";
import { useState, createContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./reduxStore/store";
import "./globals.css";
import TextSelectorBar from "@/app/components/TextSelectorBar";
import Refresh from "@/app/components/Refresh";

function Home() {
	const theme = useSelector((state: RootState) => state.theme);

	const [hydrated, setHydrated] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [navigating, setNavigating] = useState(false);

	return (
		<>
			<div
				className={`bg-${theme}-bg text-${theme}-wrong w-screen h-full ${
					hydrated && !navigating ? "hidden" : ""
				}`}
			>
				<div className="lds-dual-ring"></div>
			</div>
			<div
				className={`bg-${theme}-bg flex flex-row items-center justify-end w-full h-full gap-32 ${
					hydrated && !navigating ? "" : "hidden"
				}`}
			>
				<Logo
					textColour={`${theme}-bright`}
					secondaryColour={`${theme}-main`}
				/>

				<div className="flex flex-col items-start h-fit justify-start gap-28 translate-y-10 translate-x-20">
					<div className="flex flex-col gap-24">
						<div className="w-full flex items-center justify-center translate-x-6 translate-y-10 scale-75">
							<TextSelectorBar
								isTypingTest={false}
								themeSelectorOpen={isOpen}
								borderSelectColour={`border-${theme}-main`}
								borderColour={`border-${theme}-navbar`}
								textColour={`text-${theme}-dull`}
								textSelectColour={`text-${theme}-main`}
								hoverColour={`hover:text-${theme}-bright hover:border-${theme}-dull hover:bg-${theme}-navbar`}
								svgColour={`fill-${theme}-dull`}
								svgSelectColour={`fill-${theme}-main`}
								svgHoverColour={`group-hover:fill-${theme}-bright`}
							/>
						</div>
						<div className={`translate-x-6 mb-10 translate-y-10`}>
							<TypingArea
								hydrated={hydrated}
								setHydrated={setHydrated}
								themeOpen={isOpen}
								textColour={`text-${theme}-dull`}
								textColourCorrect={`text-${theme}-bright`}
								textColourIncorrect={`text-${theme}-wrong`}
								caretColour={`border-${theme}-main`}
								wordCountColour={`text-${theme}-main`}
							/>
						</div>
						<Refresh
							themeSelectorOpen={isOpen}
							colour={`text-${theme}-dull`}
							hoverColour={`hover:text-${theme}-bright`}
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
					themeOpen={isOpen}
					setThemeOpen={setIsOpen}
					setNavigating={setNavigating}
					textColour={`text-${theme}-dull`}
					borderTheme={`border-${theme}-dull`}
					svgFill={`fill-${theme}-dull group-hover:fill-${theme}-bright`}
					hoverColour={`hover:bg-${theme}-navbar hover:border-${theme}-dull hover:text-${theme}-bright `}
					themeSelectorColour={`bg-${theme}-bg text-${theme}-dull hover:bg-slate-300 aria-selected:bg-${theme}-bright aria-selected:text-${theme}-bg`}
				/>
			</div>
		</>
	);
}

export default Home;
