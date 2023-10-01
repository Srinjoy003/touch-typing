import React from "react";
import TypingArea from "@/components/TypingArea";
import Keyboard from "@/components/Keyboard";
import Navbar from "@/components/Navbar";
import { basename } from "path";
import { useCallback, useEffect } from "react";

function Home() {
	return (
		<div className="flex flex-row items-center justify-end w-screen h-screen gap-36 bg-dolphin-bg">
			<Navbar textColour="text-dolphin-dull" borderTheme="border-dolphin-navbar" svgFill="fill-dolphin-dull" hoverColour="hover:bg-dolphin-navbar  hover:border-dolphin-dull" />
		</div>
	);
}

export default Home;
