"use client";
import TypingArea from "@/components/TypingArea";
import Keyboard from "@/components/Keyboard";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";
import { useState } from "react";
function Home() {
	const [isOpen, setIsOpen] = useState(false);
	const [theme, setTheme] = useState("dolphin");

	// return (
	// 	<div className="flex flex-row items-center justify-end w-screen h-screen gap-32">
	// 		<Logo />
	// 		<div className="flex flex-col items-start h-fit justify-start gap-28 translate-y-10 translate-x-20">
	// 			<div className="translate-x-6 mb-10 translate-y-10">
	// 				<TypingArea
	// 					themeOpen={isOpen}
	// 					textColour={`text-${theme}-dull`}
	// 					textColourCorrect="text-dolphin-bright"
	// 					textColourIncorrect="text-dolphin-wrong"
	// 					selectorBorderColour="border-dolphin-navbar"
	// 					selectorBorderSelectedColour="border-dolphin-wrong"
	// 					selectorTextColour="text-dolphin-dull"
	// 					selectorTextSelectedColour="text-dolphin-wrong"
	// 					selectorHoverColour="hover:text-dolphin-bright hover:border-dolphin-dull hover:bg-dolphin-navbar"
	// 					selectorSvgColour="fill-dolphin-dull"
	// 					selectorSvgSelectedColour="fill-dolphin-wrong"
	// 					selectorSvgHoverColour="group-hover:fill-dolphin-dull"
	// 					caretColour="border-dolphin-wrong"
	// 					wordCountColour="text-dolphin-wrong"
	// 				/>
	// 			</div>
	// 			<div className="translate-x-10 translate-y-6 ml-24 scale-110">
	// 				<Keyboard
	// 					themeSelectorOpen={isOpen}
	// 					theme="bg-dolphin-bg"
	// 					funcTheme="bg-dolphin-bg"
	// 					pressedTheme="bg-dolphin-dull"
	// 					backgroundTheme="bg-dolphin-navbar"
	// 					textColour="text-dolphin-dull"
	// 					textPressedColour=""
	// 				/>
	// 			</div>
	// 		</div>
	// 		<Navbar
	// 			themeOpen={isOpen}
	// 			setThemeOpen={setIsOpen}
	// 			textColour="text-dolphin-dull"
	// 			borderTheme="border-dolphin-navbar"
	// 			svgFill="fill-dolphin-dull"
	// 			hoverColour="bg-dolphin-navbar
	// 			hover:border-dolphin-dull"
	// 		/>
	// 	</div>
	// );

	return (
		<div className={`bg-${theme}-bg flex flex-row items-center justify-end w-screen h-full gap-32`}>
			<Logo textColour={`${theme}-bright`} secondaryColour={`${theme}-wrong`} />
			<div className="flex flex-col items-start h-fit justify-start gap-28 translate-y-10 translate-x-20">
				<div className={`translate-x-6 mb-10 translate-y-10`}>
					<TypingArea themeOpen={isOpen} textColour={`text-${theme}-dull`} textColourCorrect={`text-${theme}-bright`} textColourIncorrect={`text-${theme}-wrong`} selectorBorderColour={`border-${theme}-navbar`} selectorBorderSelectedColour={`border-${theme}-wrong`} selectorTextColour={`text-${theme}-dull`} selectorTextSelectedColour={`text-${theme}-wrong`} selectorHoverColour={`hover:text-${theme}-bright hover:border-${theme}-dull hover:bg-${theme}-navbar`} selectorSvgColour={`fill-${theme}-dull`} selectorSvgSelectedColour={`fill-${theme}-wrong`} selectorSvgHoverColour={`group-hover:fill-${theme}-dull`} caretColour={`border-${theme}-wrong`} wordCountColour={`text-${theme}-wrong`} />
				</div>
				<div className="translate-x-10 translate-y-6 ml-24 scale-110">
					<Keyboard themeSelectorOpen={isOpen} theme={`bg-${theme}-bg`} funcTheme={`bg-${theme}-bg`} pressedTheme={`bg-${theme}-dull`} backgroundTheme={`bg-${theme}-navbar`} textColour={`text-${theme}-dull`} textPressedColour={`text-${theme}-bright`} />
				</div>
			</div>
			<Navbar themeOpen={isOpen} setThemeOpen={setIsOpen} textColour={`text-${theme}-dull`} borderTheme={`border-${theme}-navbar`} svgFill={`fill-${theme}-dull`} hoverColour={`hover:bg-${theme}-navbar hover:border-${theme}-dull`} />
		</div>
	);
}

export default Home;
