import { NumKey, LetterKey, SpecialKey, ArrowKey, NumPadKey } from "./Key";

type AddClassProp = {
	addClass?: string;
	textTheme?: string;
	theme: string;
	funcTheme?: string;
	pressedTheme: string;
	pressedTextTheme?: string;
};

function ArrowKeyPad({
	addClass,
	theme,
	textTheme,
	pressedTheme,
	pressedTextTheme,
}: AddClassProp) {
	const modifiedClass = `flex flex-col items-center w-fit h-fit ${
		addClass || ""
	}`.trim();

	return (
		<div className={modifiedClass}>
			<ArrowKey
				letter="🠁"
				keyMap="ArrowUp"
				theme={theme}
				pressedTheme={pressedTheme}
				textTheme={textTheme}
				pressedTextTheme={pressedTextTheme}
			/>

			<div className="flex flex-row ">
				<ArrowKey
					letter="🠀"
					keyMap="ArrowLeft"
					theme={theme}
					pressedTheme={pressedTheme}
					textTheme={textTheme}
					pressedTextTheme={pressedTextTheme}
				/>
				<ArrowKey
					letter="🠃"
					keyMap="ArrowDown"
					theme={theme}
					pressedTheme={pressedTheme}
					textTheme={textTheme}
					pressedTextTheme={pressedTextTheme}
				/>
				<ArrowKey
					letter="🠂"
					keyMap="ArrowRight"
					theme={theme}
					pressedTheme={pressedTheme}
					textTheme={textTheme}
					pressedTextTheme={pressedTextTheme}
				/>
			</div>
		</div>
	);
}

function FunctionKeyPad({
	addClass,
	theme,
	textTheme,
	pressedTheme,
	pressedTextTheme,
}: AddClassProp) {
	const modifiedClass = `flex flex-col w-fit h-fit ${addClass || ""}`.trim();

	return (
		<div className={modifiedClass}>
			<div className="flex flex-row">
				<NumKey
					topLetter="Insert"
					addClassText="text-[11px]"
					keyMap="Insert"
					theme={theme}
					pressedTheme={pressedTheme}
					textTheme={textTheme}
					pressedTextTheme={pressedTextTheme}
				/>
				<NumKey
					topLetter="Home"
					addClassText="text-[11px]"
					keyMap="Home"
					theme={theme}
					pressedTheme={pressedTheme}
					textTheme={textTheme}
					pressedTextTheme={pressedTextTheme}
				/>
				<NumKey
					topLetter="Page"
					bottomLetter="Up"
					addClassText="text-[11px]"
					keyMap="PageUp"
					theme={theme}
					pressedTheme={pressedTheme}
					textTheme={textTheme}
					pressedTextTheme={pressedTextTheme}
				/>
			</div>

			<div className="flex flex-row">
				<NumKey
					topLetter="Delete"
					addClassText="text-[11px]"
					keyMap="Delete"
					theme={theme}
					pressedTheme={pressedTheme}
					textTheme={textTheme}
					pressedTextTheme={pressedTextTheme}
				/>
				<NumKey
					topLetter="End"
					addClassText="text-[11px]"
					keyMap="End"
					theme={theme}
					pressedTheme={pressedTheme}
					textTheme={textTheme}
					pressedTextTheme={pressedTextTheme}
				/>
				<NumKey
					topLetter="Page"
					bottomLetter="Down"
					addClassText="text-[11px]"
					keyMap="PageDown"
					theme={theme}
					pressedTheme={pressedTheme}
					textTheme={textTheme}
					pressedTextTheme={pressedTextTheme}
				/>
			</div>
		</div>
	);
}

function NumPad({
	addClass,
	theme,
	textTheme,
	pressedTheme,
	pressedTextTheme,
}: AddClassProp) {
	const modifiedClass = `flex flex-col w-fit h-fit ${addClass || ""}`.trim();

	return (
		<div className={modifiedClass}>
			<div className="flex flex-row w-fit">
				<NumKey
					topLetter="Num"
					bottomLetter="Lock"
					keyMap="NumLock"
					addClassText="text-[11px]"
					theme={theme}
					pressedTheme={pressedTheme}
					textTheme={textTheme}
					pressedTextTheme={pressedTextTheme}
				/>
				<LetterKey
					letter="/"
					keyMap="NumpadDivide"
					theme={theme}
					pressedTheme={pressedTheme}
					textTheme={textTheme}
					pressedTextTheme={pressedTextTheme}
				/>
				<LetterKey
					letter="*"
					keyMap="NumpadMultiply"
					theme={theme}
					pressedTheme={pressedTheme}
					textTheme={textTheme}
					pressedTextTheme={pressedTextTheme}
				/>
				<LetterKey
					letter="-"
					keyMap="NumpadSubtract"
					theme={theme}
					pressedTheme={pressedTheme}
					textTheme={textTheme}
					pressedTextTheme={pressedTextTheme}
				/>
			</div>

			<div className="flex flex-row">
				<div className="flex flex-col">
					<div className="flex flex-row w-fit">
						<NumPadKey
							topLetter="7"
							bottomLetter="Home"
							keyMap="Numpad7"
							theme={theme}
							pressedTheme={pressedTheme}
							textTheme={textTheme}
							pressedTextTheme={pressedTextTheme}
						/>
						<NumPadKey
							topLetter="8"
							bottomLetter="🠁"
							keyMap="Numpad8"
							theme={theme}
							pressedTheme={pressedTheme}
							textTheme={textTheme}
							pressedTextTheme={pressedTextTheme}
						/>
						<NumPadKey
							topLetter="9"
							bottomLetter="PgUp"
							keyMap="Numpad9"
							theme={theme}
							pressedTheme={pressedTheme}
							textTheme={textTheme}
							pressedTextTheme={pressedTextTheme}
						/>
					</div>

					<div className="flex flex-row w-fit">
						<NumPadKey
							topLetter="4"
							bottomLetter="🠀"
							keyMap="Numpad4"
							theme={theme}
							pressedTheme={pressedTheme}
							textTheme={textTheme}
							pressedTextTheme={pressedTextTheme}
						/>
						<NumPadKey
							topLetter="5"
							keyMap="Numpad5"
							theme={theme}
							pressedTheme={pressedTheme}
							textTheme={textTheme}
							pressedTextTheme={pressedTextTheme}
						/>
						<NumPadKey
							topLetter="6"
							bottomLetter="🠂"
							keyMap="Numpad6"
							theme={theme}
							pressedTheme={pressedTheme}
							textTheme={textTheme}
							pressedTextTheme={pressedTextTheme}
						/>
					</div>
				</div>
				<NumPadKey
					bottomLetter="+"
					addClassDiv="h-18 w-10"
					addClassBottomText="translate-y-3"
					keyMap="NumpadAdd"
					theme={theme}
					pressedTheme={pressedTheme}
					textTheme={textTheme}
					pressedTextTheme={pressedTextTheme}
				/>
			</div>

			<div className="flex flex-row">
				<div className="flex flex-col">
					<div className="flex flex-row w-fit">
						<NumPadKey
							topLetter="1"
							bottomLetter="End"
							keyMap="Numpad1"
							theme={theme}
							pressedTheme={pressedTheme}
							textTheme={textTheme}
							pressedTextTheme={pressedTextTheme}
						/>
						<NumPadKey
							topLetter="2"
							bottomLetter="🠃"
							keyMap="Numpad2"
							theme={theme}
							pressedTheme={pressedTheme}
							textTheme={textTheme}
							pressedTextTheme={pressedTextTheme}
						/>
						<NumPadKey
							topLetter="3"
							bottomLetter="PgDn"
							keyMap="Numpad3"
							theme={theme}
							pressedTheme={pressedTheme}
							textTheme={textTheme}
							pressedTextTheme={pressedTextTheme}
						/>
					</div>
					<div className="flex flex-row w-fit">
						<NumPadKey
							topLetter="0"
							bottomLetter="Ins"
							addClassDiv="h-10 w-[82px]"
							addClassTopText="text-left"
							keyMap="Numpad0"
							theme={theme}
							pressedTheme={pressedTheme}
							textTheme={textTheme}
							pressedTextTheme={pressedTextTheme}
						/>
						<NumPadKey
							topLetter="."
							bottomLetter="Del"
							keyMap="NumpadDecimal"
							theme={theme}
							pressedTheme={pressedTheme}
							textTheme={textTheme}
							pressedTextTheme={pressedTextTheme}
						/>
					</div>
				</div>

				<NumPadKey
					bottomLetter="Enter"
					addClassDiv="h-18 w-10"
					addClassBottomText="translate-y-3"
					keyMap="NumpadEnter"
					theme={theme}
					pressedTheme={pressedTheme}
					textTheme={textTheme}
					pressedTextTheme={pressedTextTheme}
				/>
			</div>
		</div>
	);
}

export { ArrowKeyPad, FunctionKeyPad, NumPad };
