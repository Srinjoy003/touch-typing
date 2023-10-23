"use client";
import TypingArea from "@/components/TypingArea";
import Keyboard from "@/components/Keyboard";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";
import { useState } from "react";
import TestBar from "./testBar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reduxStore/store";
import CountdownTimer from "./CountdownTimer";
import TextSelectorBar from "@/components/TextSelectorBar";
import "../globals.css";
import Refresh from "@/components/Refresh";
import { toggleResult } from "../reduxStore/resultSlice";
import { alterRefresh } from "../reduxStore/refreshSlice";
import { resetTimeAccuracy } from "../reduxStore/speedAccuracySlice";
import { GiNextButton } from "react-icons/gi";

function Home() {
	const [isOpen, setIsOpen] = useState(false);
	const [hydrated, setHydrated] = useState(false);
	const [isTimerVisible, setIsTimerVisible] = useState(false);

	const theme = useSelector((state: RootState) => state.theme);
	const totalChar = useSelector(
		(state: RootState) => state.speedAccuracy.totalChar
	);
	const correctChar = useSelector(
		(state: RootState) => state.speedAccuracy.correctChar
	);
	const speed = useSelector((state: RootState) => state.speedAccuracy.speed);
	const accuracy = useSelector(
		(state: RootState) => state.speedAccuracy.accuracy
	);

	const mistakes = totalChar - correctChar;
	const result = useSelector((state: RootState) => state.result);

	const dispatch = useDispatch();

	const handleResultScreen = () => {
		dispatch(toggleResult());
		dispatch(alterRefresh());
		dispatch(resetTimeAccuracy());
		setIsTimerVisible(false);
	};

	return (
		<>
			<div
				className={`bg-${theme}-bg text-${theme}-wrong w-full h-full ${
					hydrated ? "hidden" : ""
				}`}
			>
				<div className="lds-dual-ring"></div>
			</div>

			<div
				className={`w-full h-full text-${theme}-main bg-${theme}-bg flex item-center justify-center ${
					result ? "" : "hidden"
				}`}
			>
				<div className="flex flex-col items-center justify-center gap-10">
					<div className="flex gap-20 text-7xl items-center justify-center">
						<div>
							<h1 className="h-fit font-semibold">
								{speed}
								<span className="text-4xl font-mono font-thin">WPM</span>
							</h1>
							<p className={`text-lg text-center`}>Speed</p>
						</div>
						<div>
							<h1 className="h-fit font-semibold">
								{mistakes}
								<span className="text-4xl font-mono font-thin">CHAR</span>
							</h1>
							<p className={`text-lg text-center`}>Mistakes</p>
						</div>
						<div>
							<h1 className="h-fit font-semibold">
								{accuracy}
								<span className="text-4xl font-mono font-thin">%</span>
							</h1>
							<p className={`text-lg text-center`}>Accuracy</p>
						</div>
					</div>

					<div
						className={`font-semibold flex gap-3 items-center justify-center text-${theme}-dull border-${theme}-dull cursor-pointer border-2 rounded-3xl p-3 hover:border-${theme}-bright hover:text-${theme}-bright px-5`}
						onClick={handleResultScreen}
					>
						<span className="text-xl">
							<GiNextButton />
						</span>
						<span>RETURN</span>
					</div>
				</div>
			</div>
			<div
				className={`bg-${theme}-bg flex flex-row items-center justify-end w-full h-full gap-32 ${
					hydrated && !result ? "" : "hidden"
				}`}
			>
				<Logo
					textColour={`${theme}-bright`}
					secondaryColour={`${theme}-main`}
				/>

				<div className="flex flex-col items-start h-fit justify-start gap-28 translate-y-10 translate-x-20">
					<div className="absolute">
						<CountdownTimer themeSelectorOpen={isOpen} isTimerVisible={isTimerVisible} setIsTimerVisible={setIsTimerVisible}/>
					</div>
					<div className="flex flex-col gap-24">
						<div className="w-full flex items-start justify-center translate-x-6 translate-y-10 gap-0 scale-75">
							<TextSelectorBar
								isTypingTest={true}
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
							<TestBar
								themeSelectorOpen={isOpen}
								borderColour={`border-${theme}-navbar`}
								borderSelectColour={`border-${theme}-main`}
								textColour={`text-${theme}-dull`}
								textSelectColour={`text-${theme}-main`}
								hoverColour={`hover:text-${theme}-bright hover:border-${theme}-dull hover:bg-${theme}-navbar`}
								textHoverColour={`hover:text-${theme}-bright`}
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
					textColour={`text-${theme}-dull`}
					borderTheme={`border-${theme}-navbar`}
					svgFill={`fill-${theme}-dull group-hover:fill-${theme}-bright`}
					hoverColour={`hover:bg-${theme}-navbar hover:border-${theme}-dull hover:text-${theme}-bright `}
					themeSelectorColour={`bg-${theme}-bg text-${theme}-dull hover:bg-slate-300 aria-selected:bg-${theme}-bright aria-selected:text-${theme}-bg`}
				/>
			</div>
		</>
	);
}

export default Home;
