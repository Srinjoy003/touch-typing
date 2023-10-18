import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore/store";
import { useState, useCallback, useEffect } from "react";

type CountdownTimerProp = { themeSelectorOpen: boolean };

function CountdownTimer({ themeSelectorOpen }: CountdownTimerProp) {
	const coundownTime = useSelector((state: RootState) => state.countdown);
	const [isTimerVisible, setIsTimerVisible] = useState(false);

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

	return (
		<div
			className={`transition-opacity duration-200 ${
				isTimerVisible ? "opacity-100" : "opacity-0"
			}`}
		>
			<CountdownCircleTimer
				isPlaying
				duration={coundownTime}
				key={`${coundownTime} ${isTimerVisible}`}
				colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
				colorsTime={[7, 5, 2, 0]}
				size={80}
				strokeWidth={2}
			>
				{({ remainingTime, color }) => (
					<div style={{ color: color }}>{remainingTime}</div>
				)}
			</CountdownCircleTimer>
		</div>
	);
}

export default CountdownTimer;
