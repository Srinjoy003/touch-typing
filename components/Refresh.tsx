import { VscDebugRestart } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { alterRefresh } from "@/app/reduxStore/refreshSlice";
import { useRef, useEffect, useCallback } from "react";

type RefreshProps = {
	colour: string;
	hoverColour: string;
	themeSelectorOpen: boolean;
};
function Refresh({ colour, hoverColour, themeSelectorOpen }: RefreshProps) {
	const dispatch = useDispatch();
	const handleRefresh = () => {
		dispatch(alterRefresh());
	};

	const refreshRef = useRef(null);

	const handleVisibility = useCallback((event: MouseEvent | KeyboardEvent) => {
		if (refreshRef.current) {
			const textSelectorDiv = refreshRef.current as HTMLDivElement;

			if (event.type === "keydown") {
				textSelectorDiv.classList.add("opacity-0");
				textSelectorDiv.classList.remove("opacity-100");
			} else if (event.type === "mousemove") {
				textSelectorDiv.classList.add("opacity-100");
				textSelectorDiv.classList.remove("opacity-0");
			}
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
	return (
		<div
			ref={refreshRef}
			className={`absolute top-2/3 left-1/2 text-4xl -translate-y-20 cursor-pointer opacity-100 transition-opacity duration-200 ${colour} ${hoverColour}`}
			onClick={handleRefresh}
		>
			<VscDebugRestart />
		</div>
	);
}

export default Refresh;
