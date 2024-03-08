import { OTPInput, SlotProps } from "input-otp";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore/store";

export function Slot(props: SlotProps) {
	const theme = useSelector((state: RootState) => state.theme);

	return (
		<div
			className={cn(
				"relative w-20 h-28 text-[4rem]",
				"flex items-center justify-center",
				"transition-all duration-300",
				`border-${theme}-dull border-y border-r first:border-l first:rounded-l-md last:rounded-r-md`,
				"group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20",
				"outline outline-0 outline-accent-foreground/20",
				{ "outline-4 outline-accent-foreground": props.isActive }
			)}
		>
			{props.char !== null && <div>{props.char}</div>}
			{props.hasFakeCaret && <FakeCaret />}
		</div>
	);
}

export function FakeCaret() {
	const theme = useSelector((state: RootState) => state.theme);
	return (
		<div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
			<div className={`w-[2px] h-16 bg-${theme}-main`} />
		</div>
	);
}

export function FakeDash() {
	const theme = useSelector((state: RootState) => state.theme);

	return (
		<div className="flex w-10 justify-center items-center">
			<div className={`w-6 h-2 rounded-full bg-${theme}-dull bg-opacity-50`} />
		</div>
	);
}
