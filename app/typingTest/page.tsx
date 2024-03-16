"use client";
import TypingArea from "@/app/components/TypingArea";
import Keyboard from "@/app/components/Keyboard";
import Navbar from "@/app/components/Navbar";
import Logo from "@/app/components/Logo";
import { useState, useEffect, useCallback } from "react";
import TestBar from "./testBar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reduxStore/store";
import CountdownTimer from "./CountdownTimer";
import TextSelectorBar from "@/app/components/TextSelectorBar";
import "../globals.css";
import Refresh from "@/app/components/Refresh";
import { toggleResult } from "../reduxStore/resultSlice";
import { alterRefresh } from "../reduxStore/refreshSlice";
import { resetTimeAccuracy } from "../reduxStore/speedAccuracySlice";
import { GiNextButton } from "react-icons/gi";
import Cookies from "js-cookie";
import { setLogin } from "../reduxStore/loginSlice";
import Profile from "../components/Profile";
import { setSpeed, setAccuracy } from "../reduxStore/speedAccuracySlice";
import { resetsetWordCountSetting } from "../reduxStore/wordCountSlice";
import { debounce } from "lodash";

type StatType = {
	username: string;
	mode: string;
	speed: number;
	accuracy: number;
	rawSpeed: number;
	wordCount: number;
	totalChars: number;
	correctChar: number;
	errorChar: number;
	createdAt: Date;
};

function TypingTest() {
	const [isOpen, setIsOpen] = useState(false);
	const [hydrated, setHydrated] = useState(false);
	const [isTimerVisible, setIsTimerVisible] = useState(false);
	const [navigating, setNavigating] = useState(false);
	const [testStarted, setTestStarted] = useState(false);

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
	const wordCount = useSelector(
		(state: RootState) => state.speedAccuracy.wordCount
	);
	const totalWordCount = useSelector(
		(state: RootState) => state.wordCountSetting
	);

	const timeTaken = useSelector((state: RootState) => state.speedAccuracy.time);
	const testType = useSelector((state: RootState) => state.testType);
	const testStats = useSelector((state: RootState) => state.speedAccuracy);
	const login = useSelector((state: RootState) => state.login);

	const dispatch = useDispatch();

	const handleResultScreen = useCallback(() => {
		dispatch(toggleResult());
		dispatch(alterRefresh());
		dispatch(resetTimeAccuracy());
		setIsTimerVisible(false);
		resetsetWordCountSetting();
	}, [dispatch]);

	useEffect(() => {
		if (wordCount === totalWordCount && testType === "word") {
			dispatch(setSpeed(Number((totalChar / 5 / (timeTaken / 60)).toFixed(2))));

			if (totalChar === 0) dispatch(setAccuracy(Number((0).toFixed(2))));
			else
				dispatch(
					setAccuracy(Number(((correctChar / totalChar) * 100).toFixed(2)))
				);

			dispatch(toggleResult());
			setIsTimerVisible(false);
			setTestStarted(false);
		}
	}, [
		wordCount,
		totalWordCount,
		handleResultScreen,
		setTestStarted,
		totalChar,
		timeTaken,
		dispatch,
		correctChar,
		testType,
	]);

	const uploadStats = useCallback(async () => {
		if (!login) return;
		try {
			const mode = `${testType} ${
				testType === "time" ? timeTaken : totalWordCount
			}`;
			const stats: StatType = {
				username: login,
				mode: mode,
				rawSpeed: testStats.speed,
				accuracy: testStats.accuracy,
				speed: Number(
					((testStats.speed * testStats.accuracy) / 100).toFixed(2)
				),
				wordCount: testStats.wordCount,
				totalChars: testStats.totalChar,
				correctChar: testStats.correctChar,
				errorChar: testStats.totalChar - testStats.correctChar,
				createdAt: new Date(),
			};

			console.log("STATS", stats);

			const response = await fetch("../api/stats", {
				method: "POST",
				body: JSON.stringify(stats),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const responseText = await response.text();
			console.log(responseText);
		} catch (error) {
			console.error("Error sending stats:", error);
		}
	}, [
		login,
		testStats.speed,
		testType,
		testStats.accuracy,
		testStats.correctChar,
		testStats.wordCount,
		testStats.totalChar,
		,
		timeTaken,
		totalWordCount,
	]);

	useEffect(() => {
		if (result) {
			uploadStats();
		}
	}, [result]); //eslint-disable-line

	useEffect(() => {
		const username = Cookies.get("username");
		if (username) {
			dispatch(setLogin(username));
		}
	}, [dispatch]);

	return (
		<>
			<div
				className={`bg-${theme}-bg text-${theme}-wrong w-screen h-full ${
					hydrated && !navigating ? "hidden" : ""
				}`}
			>
				<div
					className={`absolute left-1/2 top-1/2 block w-[64px] h-[64px] rounded-full border-[6px] border-solid border-x-${theme}-wrong border-y-transparent animate-spin`}
				></div>
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
					hydrated && !result && !navigating ? "" : "hidden"
				}`}
			>
				<Logo
					className="absolute top-12 left-12"
					textColour={`${theme}-main`}
					secondaryColour={`${theme}-main`}
				/>
				<Profile className="absolute right-10 top-10" />

				<div className="flex flex-col items-start h-fit justify-start gap-28 translate-y-10 translate-x-20">
					<div className="absolute right-1/2 -top-32 translate-x-10">
						<CountdownTimer
							themeSelectorOpen={isOpen}
							isTimerVisible={isTimerVisible}
							setIsTimerVisible={setIsTimerVisible}
							testStarted={testStarted}
							setTestStarted={setTestStarted}
						/>
					</div>
					<div className="flex flex-col gap-24">
						<div className="w-full flex items-start justify-center translate-x-6 translate-y-10 gap-0 scale-75">
							<TextSelectorBar
								isTypingTest={true}
								themeSelectorOpen={isOpen}
								borderSelectColour={`border-${theme}-main`}
								borderColour={`border-${theme}-dull border-opacity-40`}
								textColour={`text-${theme}-dull`}
								textSelectColour={`text-${theme}-main`}
								hoverColour={`hover:text-${theme}-bright hover:border-${theme}-dull hover:bg-${theme}-navbar`}
								svgColour={`fill-${theme}-dull`}
								svgSelectColour={`fill-${theme}-main`}
								svgHoverColour={`group-hover:fill-${theme}-bright`}
								isTest={true}
							/>
							<TestBar
								themeSelectorOpen={isOpen}
								borderColour={`border-${theme}-dull border-opacity-40`}
								borderSelectColour={`border-${theme}-main`}
								textColour={`text-${theme}-dull`}
								textSelectColour={`text-${theme}-main`}
								hoverColour={`hover:text-${theme}-bright hover:border-${theme}-dull hover:bg-${theme}-navbar`}
								textHoverColour={`hover:text-${theme}-bright`}
							/>
						</div>
						<div className={`translate-x-6 mb-10 translate-y-10`}>
							<TypingArea
								isTest={true}
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

export default TypingTest;
