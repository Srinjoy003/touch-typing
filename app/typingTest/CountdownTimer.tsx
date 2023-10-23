import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reduxStore/store";
import { useState, useCallback, useEffect } from "react";
import { setSpeed, setAccuracy } from "../reduxStore/speedAccuracySlice";
import { toggleResult } from "../reduxStore/resultSlice";

type CountdownTimerProp = {
	themeSelectorOpen: boolean;
	isTimerVisible: boolean;
	setIsTimerVisible: (visible: boolean) => void;
};

function CountdownTimer({ themeSelectorOpen, isTimerVisible, setIsTimerVisible }: CountdownTimerProp) {
	const coundownTime = useSelector((state: RootState) => state.countdown);
	const result = useSelector((state: RootState) => state.result);

	const totalChar = useSelector(
		(state: RootState) => state.speedAccuracy.totalChar
	);
	const correctChar = useSelector(
		(state: RootState) => state.speedAccuracy.correctChar
	);


	const handleVisibility = useCallback((event: KeyboardEvent) => {
		const pattern = /^[a-zA-Z0-9\s`~!@#$%^&*()_+={[}\]:;"'<,>.?/\\|,-]$/;

		if (pattern.test(event.key)) {
			setIsTimerVisible(true);
		}
	}, []);

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
	}, [coundownTime]);

	const dispatch = useDispatch();

	return (
		<div
			className={`transition-opacity duration-200 ${
				isTimerVisible ? "opacity-100" : "opacity-0"
			}`}
		>
			<CountdownCircleTimer
				isPlaying
				duration={coundownTime}
				key={`${coundownTime} ${isTimerVisible} ${result}`}
				colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
				colorsTime={[7, 5, 2, 0]}
				size={80}
				strokeWidth={2}
				onComplete={(time: number) => {
					if (isTimerVisible) {
						dispatch(setSpeed((totalChar / 5 / (time / 60)).toFixed(2)));
						dispatch(setAccuracy(((correctChar / totalChar) * 100).toFixed(2)));
						dispatch(toggleResult());
						setIsTimerVisible(false);
					}
				}}
			>
				{({ remainingTime, color }) => (
					<div style={{ color: color }}>{remainingTime}</div>
				)}
			</CountdownCircleTimer>
		</div>
	);
}

export default CountdownTimer;
