import MainKeyboard from "./MainKeyboard";
import { ArrowKeyPad, FunctionKeyPad, NumPad } from "./SmallKeySections";
import { useState, useEffect, useCallback } from "react";

type AddClassProp = {
	addClass?: string;
	theme: string;
	funcTheme: string;
	pressedTheme: string;
	backgroundTheme: string;
	textColour: string;
	textPressedColour: string;
	themeSelectorOpen: boolean;
};

function Keyboard({
	themeSelectorOpen,
	addClass,
	theme,
	funcTheme,
	pressedTheme,
	backgroundTheme,
	textColour,
	textPressedColour,
}: AddClassProp) {
	const [isKeyboardVisible, setKeyboardVisibility] = useState(false);

	const handleVisibility = useCallback((event: MouseEvent | KeyboardEvent) => {
		const pattern = /^[a-zA-Z0-9\s`~!@#$%^&*()_+={[}\]:;"'<,>.?/\\|,-]$/;

		if (event.type === "keydown") {
			event = event as KeyboardEvent;

			if (pattern.test(event.key)) setKeyboardVisibility(true);
		} else if (event.type === "mousemove") {
			setKeyboardVisibility(false);
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

	const modifiedClass =
		`flex flex-col items-center mt-1 ml-0.5 bg-stone-200 h-9  ${
			addClass || ""
		}`.trim();
	const modifiedDivClass = `flex flex-row justify-center items-center w-[970px] gap-4 h-[235px] rounded-md transition-opacity duration-200 ${backgroundTheme} ${
		isKeyboardVisible ? "opacity-100" : "opacity-0"
	}`;

	return (
		<div className={modifiedDivClass}>
			<MainKeyboard
				addClass=""
				theme={theme}
				funcTheme={funcTheme}
				pressedTheme={pressedTheme}
				textTheme={textColour}
				pressedTextTheme={textPressedColour}
			/>

			<div className="flex flex-col gap-10 ">
				<FunctionKeyPad
					addClass=""
					theme={theme}
					pressedTheme={pressedTheme}
					textTheme={textColour}
					pressedTextTheme={textPressedColour}
				/>
				<ArrowKeyPad
					addClass=""
					theme={theme}
					pressedTheme={pressedTheme}
					textTheme={textColour}
					pressedTextTheme={textPressedColour}
				/>
			</div>

			<NumPad
				addClass=""
				theme={theme}
				pressedTheme={pressedTheme}
				textTheme={textColour}
				pressedTextTheme={textPressedColour}
			/>
		</div>
	);
}

export default Keyboard;
