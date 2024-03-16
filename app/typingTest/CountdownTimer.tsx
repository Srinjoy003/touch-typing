import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reduxStore/store";
import { useState, useCallback, useEffect } from "react";
import { setSpeed, setAccuracy } from "../reduxStore/speedAccuracySlice";
import { toggleResult } from "../reduxStore/resultSlice";
import { colour } from "@/assets/colour";
import { setTime } from "../reduxStore/speedAccuracySlice";
import { setCountdown } from "../reduxStore/countdownSlice";

type CountdownTimerProp = {
	themeSelectorOpen: boolean;
	isTimerVisible: boolean;
	setIsTimerVisible: (visible: boolean) => void;
	testStarted: boolean;
	setTestStarted: (testStarted: boolean) => void;
};

function CountdownTimer({
	themeSelectorOpen,
	isTimerVisible,
	setIsTimerVisible,
	testStarted,
	setTestStarted,
}: CountdownTimerProp) {
	const coundownTime = useSelector((state: RootState) => state.countdown);
	const result = useSelector((state: RootState) => state.result);
	const theme = useSelector((state: RootState) => state.theme);
	const testType = useSelector((state: RootState) => state.testType);
	const wordTestTime = useSelector(
		(state: RootState) => state.speedAccuracy.time
	);
	const refresh = useSelector((state: RootState) => state.refresh);

	const totalChar = useSelector(
		(state: RootState) => state.speedAccuracy.totalChar
	);
	const correctChar = useSelector(
		(state: RootState) => state.speedAccuracy.correctChar
	);

	const dispatch = useDispatch();

	const handleVisibility = useCallback(
		(event: KeyboardEvent) => {
			const pattern = /^[a-zA-Z0-9\s`~!@#$%^&*()_+={[}\]:;"'<,>.?/\\|,-]$/;

			if (pattern.test(event.key)) {
				if (testType === "time") setIsTimerVisible(true);
				setTestStarted(true);
			}
		},
		[setIsTimerVisible, testType, setTestStarted]
	);

	useEffect(() => {
		setTestStarted(false);
	}, [refresh, coundownTime, setTestStarted]);

	useEffect(() => {
		if (!themeSelectorOpen) {
			document.addEventListener("keydown", handleVisibility);

			return () => {
				document.removeEventListener("keydown", handleVisibility);
			};
		}
	}, [handleVisibility, themeSelectorOpen]);

	useEffect(() => {
		setIsTimerVisible(false);
	}, [coundownTime, setIsTimerVisible, refresh, testType]);

	const colour1 = colour[
		`${theme}-bright` as keyof typeof colour
	] as `#${string}`;
	const colour2 = colour[
		`${theme}-dull` as keyof typeof colour
	] as `#${string}`;
	const colour3 = colour[
		`${theme}-wrong` as keyof typeof colour
	] as `#${string}`;
	const colour4 = colour[
		`${theme}-navbar` as keyof typeof colour
	] as `#${string}`;

	return (
		<div
			className={`transition-opacity duration-200 ${
				isTimerVisible ? "opacity-100" : "opacity-0"
			}`}
		>
			<CountdownCircleTimer
				isPlaying
				duration={coundownTime}
				key={`${coundownTime} ${testStarted} ${refresh}`}
				colors={[colour1, colour3]}
				colorsTime={[coundownTime, 10, 0]}
				size={120}
				strokeWidth={8}
				trailColor={colour4}
				isSmoothColorTransition={false}
				onUpdate={(timeRemaining) => {
					if (testStarted && !result) {
						dispatch(setTime(coundownTime - timeRemaining));
					}
				}}
				onComplete={(time: number) => {
					if (testStarted && !result) {
						dispatch(
							setSpeed((totalChar / 5 / (wordTestTime / 60)).toFixed(2))
						);
						dispatch(toggleResult());
						setIsTimerVisible(false);
						setTestStarted(false);

						if (totalChar === 0) dispatch(setAccuracy((0).toFixed(2)));
						else
							dispatch(
								setAccuracy(((correctChar / totalChar) * 100).toFixed(2))
							);
					}
				}}
			>
				{({ remainingTime, color }) => (
					<div className="font-semibold text-2xl" style={{ color: color }}>
						{remainingTime}
					</div>
				)}
			</CountdownCircleTimer>
		</div>
	);
}

export default CountdownTimer;
