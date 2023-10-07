"use client";

import { useState, useEffect } from "react";

type NumProp = {
	topLetter?: string;
	bottomLetter?: string;
	addClassDiv?: string;
	addClassText?: string;
	theme: string;
	pressedTheme: string;
	textTheme?: string;
	pressedTextTheme?: string;
	keyMap: string;
};
type NumPadProp = {
	topLetter?: string;
	bottomLetter?: string;
	addClassDiv?: string;
	addClassTopText?: string;
	addClassBottomText?: string;
	theme: string;
	pressedTheme: string;
	textTheme?: string;
	pressedTextTheme?: string;
	keyMap: string;
};
type LetterProp = {
	letter?: string;
	addClassDiv?: string;
	addClassText?: string;
	theme: string;
	pressedTheme: string;
	textTheme?: string;
	pressedTextTheme?: string;
	keyMap: string;
};
type SpecialProp = {
	letter?: string;
	addClassDiv?: string;
	theme: string;
	pressedTheme: string;
	textTheme?: string;
	pressedTextTheme?: string;
	keyMap: string;
};

function NumKey({
	topLetter,
	bottomLetter,
	addClassDiv,
	addClassText,
	keyMap,
	theme,
	pressedTheme,
	textTheme,
	pressedTextTheme,
}: NumProp) {
	const [isPressed, setIsPressed] = useState(false);

	useEffect(() => {
		const keyDown = (event: any) => {
			if (event.code === keyMap) {
				setIsPressed(true);
			}
		};

		const keyUp = (event: any) => {
			if (event.code === keyMap) {
				setIsPressed(false);
			}
		};

		window.addEventListener("keydown", keyDown);
		window.addEventListener("keyup", keyUp);

		// return () => {
		//   window.removeEventListener('keydown', keyDown);
		//   window.removeEventListener('keyup', keyUp);
		// };
	}, [keyMap]);

	const modifiedDivClass =
		`flex flex-col items-center gap-1 focus:outline-none mt-1 ml-0.5 ${
			isPressed ? pressedTheme : theme
		} ${addClassDiv || "h-10 w-10"}`.trim();
	const modifiedTextClass = `text-xs ${addClassText || ""} ${
		isPressed ? pressedTextTheme : textTheme
	}`.trim();

	return (
		<div className={modifiedDivClass}>
			<p className={modifiedTextClass}>{topLetter}</p>
			<p className={modifiedTextClass}>{bottomLetter}</p>
		</div>
	);
}

function LetterKey({
	letter,
	addClassDiv,
	addClassText,
	keyMap,
	theme,
	pressedTheme,
	textTheme,
	pressedTextTheme,
}: LetterProp) {
	const [isPressed, setIsPressed] = useState(false);

	useEffect(() => {
		const keyDown = (event: any) => {
			if (event.code === keyMap) {
				setIsPressed(true);
			}
		};

		const keyUp = (event: any) => {
			if (event.code === keyMap) {
				setIsPressed(false);
			}
		};

		window.addEventListener("keydown", keyDown);
		window.addEventListener("keyup", keyUp);

		// return () => {
		//   window.removeEventListener('keydown', keyDown);
		//   window.removeEventListener('keyup', keyUp);
		// };
	}, [keyMap]);

	const modifiedDivClass = `flex items-center mt-1 ml-0.5 focus:outline-none ${
		addClassDiv || "h-10 w-10"
	} ${isPressed ? pressedTheme : theme}`.trim();
	const modifiedTextClass = `w-full text-xs text-center ${addClassText || ""} ${
		isPressed ? pressedTextTheme : textTheme
	}`.trim();

	return (
		<div className={modifiedDivClass}>
			<p className={modifiedTextClass}>{letter}</p>
		</div>
	);
}

function SpecialKey({
	letter,
	addClassDiv,
	keyMap,
	theme,
	pressedTheme,
	textTheme,
	pressedTextTheme,
}: SpecialProp) {
	const [isPressed, setIsPressed] = useState(false);

	useEffect(() => {
		const keyDown = (event: any) => {
			if (event.code === keyMap) {
				event.preventDefault();
				setIsPressed(true);
			}
		};

		const keyUp = (event: any) => {
			if (event.code === keyMap) {
				event.preventDefault();
				setIsPressed(false);
			}
		};

		window.addEventListener("keydown", keyDown);
		window.addEventListener("keyup", keyUp);

		// return () => {
		//   window.removeEventListener('keydown', keyDown);
		//   window.removeEventListener('keyup', keyUp);
		// };
	}, [keyMap]);

	const modifiedDivClass =
		`flex items-center mt-1 ml-0.5 h-10   focus:outline-none h-10 ${
			addClassDiv || "w-10"
		} ${isPressed ? pressedTheme : theme}`.trim();
	const modifiedTextClass = `w-full text-[11px] text-center  ${
		isPressed ? pressedTextTheme : textTheme
	}`.trim();

	return (
		<div className={modifiedDivClass}>
			<p className={modifiedTextClass}>{letter}</p>
		</div>
	);
}

function ArrowKey({
	letter,
	addClassDiv,
	addClassText,
	keyMap,
	theme,
	pressedTheme,
	textTheme,
	pressedTextTheme,
}: LetterProp) {
	const [isPressed, setIsPressed] = useState(false);

	useEffect(() => {
		const keyDown = (event: any) => {
			if (event.code === keyMap) {
				setIsPressed(true);
			}
		};

		const keyUp = (event: any) => {
			if (event.code === keyMap) {
				setIsPressed(false);
			}
		};

		window.addEventListener("keydown", keyDown);
		window.addEventListener("keyup", keyUp);

		// return () => {
		//   window.removeEventListener('keydown', keyDown);
		//   window.removeEventListener('keyup', keyUp);
		// };
	}, [keyMap]);

	const modifiedTextClass = `w-full text-2xl text-center ${
		addClassText || ""
	} ${isPressed ? pressedTextTheme : textTheme}`.trim();
	const modifiedDivClass = `flex items-center mt-1 ml-0.5 focus:outline-none ${
		addClassDiv || "h-10 w-10 "
	} ${isPressed ? pressedTheme : theme}`.trim();

	return (
		<div className={modifiedDivClass}>
			<p className={modifiedTextClass}>{letter}</p>
		</div>
	);
}

function NumPadKey({
	topLetter,
	bottomLetter,
	addClassDiv,
	addClassTopText,
	addClassBottomText,
	keyMap,
	theme,
	pressedTheme,
	textTheme,
	pressedTextTheme,
}: NumPadProp) {
	const [isPressed, setIsPressed] = useState(false);

	useEffect(() => {
		const keyDown = (event: any) => {
			if (event.code === keyMap) {
				setIsPressed(true);
			}
		};

		const keyUp = (event: any) => {
			if (event.code === keyMap) {
				setIsPressed(false);
			}
		};

		window.addEventListener("keydown", keyDown);
		window.addEventListener("keyup", keyUp);

		return () => {
			window.removeEventListener("keydown", keyDown);
			window.removeEventListener("keyup", keyUp);
		};
	}, [keyMap]);

	const modifiedDivClass =
		`flex flex-col items-center gap-1 mt-1 ml-0.5 focus:outline-none ${
			addClassDiv || "h-10 w-10"
		} ${isPressed ? pressedTheme : theme}`.trim();
	const classTopText = `text-sm ${addClassTopText || ""} ${
		isPressed ? pressedTextTheme : textTheme
	}`.trim();
	const classBottomText = `text-[9px] ${addClassBottomText || ""} ${
		isPressed ? pressedTextTheme : textTheme
	}`.trim();

	return (
		<div className={modifiedDivClass}>
			<p className={classTopText}>{topLetter}</p>
			<p className={classBottomText}>{bottomLetter}</p>
		</div>
	);
}

export { NumKey, LetterKey, SpecialKey, ArrowKey, NumPadKey };
