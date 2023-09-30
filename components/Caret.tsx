import { useEffect, useRef, useCallback } from "react";

type CaretProp = { translateY: number; translateX: number; colour: string };

function Caret({ translateX, translateY, colour }: CaretProp) {
	const caretRef = useRef(null);

	const handlePulse = useCallback((event: MouseEvent | KeyboardEvent) => {
		if (caretRef.current) {
			const caretDiv = caretRef.current as HTMLDivElement;

			if (event.type === "keydown") {
				caretDiv.classList.remove("animate-pulse");
			} else if (event.type === "mousemove") {
				caretDiv.classList.add("animate-pulse");
			}
		}
	}, []);

	useEffect(() => {
		document.addEventListener("keydown", handlePulse);
		document.addEventListener("mousemove", handlePulse);

		return () => {
			document.removeEventListener("keydown", handlePulse);
			document.addEventListener("mousemove", handlePulse);
		};
	}, [handlePulse]);

	const modifiedStyle = { transform: `translateX(${translateX}px) translateY(${translateY}px)` };
	const modifiedClass = `absolute border-[1.5px] h-7 transition-transform duration-200 animate-pulse ${colour}`;

	return <div ref={caretRef} className={modifiedClass} style={modifiedStyle}></div>;
}

export default Caret;
