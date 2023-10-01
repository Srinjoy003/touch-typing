'use client'
import TypingArea from "@/components/TypingArea";
import Keyboard from "@/components/Keyboard";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";
import { useState } from "react";


function Home() {

	return (
		<div className="flex flex-row items-center justify-end w-screen h-screen gap-32 bg-dolphin-bg">
			<Logo />
			<div className="flex flex-col items-start h-fit justify-start gap-28 translate-y-10 translate-x-20">
				<div className="translate-x-6 mb-10 translate-y-10">
					<TypingArea textColour="text-dolphin-dull" textColourCorrect="text-dolphin-bright" textColourIncorrect="text-dolphin-wrong" selectorBorderColour="border-dolphin-navbar" selectorBorderSelectedColour="border-dolphin-wrong" selectorTextColour="text-dolphin-dull" selectorTextSelectedColour="text-dolphin-wrong" selectorHoverColour="hover:text-dolphin-bright hover:border-dolphin-dull hover:bg-dolphin-navbar" selectorSvgColour="fill-dolphin-dull" selectorSvgSelectedColour="fill-dolphin-wrong" selectorSvgHoverColour="group-hover:fill-dolphin-dull" caretColour="border-dolphin-wrong" wordCountColour="text-dolphin-wrong"/>
				</div>
				<div className="translate-x-10 translate-y-6 ml-24 scale-110">
					<Keyboard theme="bg-dolphin-bg" funcTheme="bg-dolphin-bg" pressedTheme="bg-dolphin-dull" backgroundTheme="bg-dolphin-navbar" textColour="text-dolphin-dull" textPressedColour="" />
				</div>
			</div>
			<Navbar textColour="text-dolphin-dull" borderTheme="border-dolphin-navbar" svgFill="fill-dolphin-dull" hoverColour="hover:bg-dolphin-navbar  hover:border-dolphin-dull" />
		</div>
	);
}

export default Home;
