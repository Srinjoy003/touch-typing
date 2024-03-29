"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/app/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/app/components/ui/popover";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setTheme } from "@/app/reduxStore/themeSlice";

type themeProp = {
	open: any;
	setOpen: any;
	addClass: string;
	svgFill: string;
	themeSelectorColour: string;
};

const themes = [
	{
		value: "ocean breeze",
		label: "ocean breeze",
	},
	{
		value: "retro nightfall",
		label: "retro nightfall",
	},
	{
		value: "wildscape",
		label: "wildscape",
	},
	{
		value: "cyber citrus",
		label: "cyber citrus",
	},
	{
		value: "arcadia",
		label: "arcadia",
	},
	{
		value: "delight",
		label: "delight",
	},
	{
		value: "crimson royale",
		label: "crimson royale",
	},
	{
		value: "dark magic",
		label: "dark magic",
	},

	{
		value: "spectrum glow",
		label: "spectrum glow",
	},

	{
		value: "soaring skies",
		label: "soaring skies",
	},

	{
		value: "passion fruit",
		label: "passion fruit",
	},

	{
		value: "cosmic mist",
		label: "cosmic mist",
	},

	{
		value: "amber essence",
		label: "amber essence",
	},

	{
		value: "earthsong",
		label: "earthsong",
	},
];

type ThemeMap = {
	[key: string]: string;
};

const themeMap: ThemeMap = {
	"ocean breeze": "dolphin",
	arcadia: "arch",
	"cyber citrus": "tron",
	"retro nightfall": "retro",
	delight: "cheese",
	wildscape: "husqy",
	"dark magic": "magic",
	"crimson royale": "crimson",
	"minty mirage": "retrocast",
	"spectrum glow": "sonokai",
	"soaring skies": "soaring",
	"passion fruit": "fruit",
	"cosmic mist": "nebula",
	"amber essence": "honey",
	earthsong: "earthsong",
};

// blue dolphin - Ocean Breeze (dolphin)
// husqy- "Wildscape"(husqy)
// tron orange- Cyber Citrus (tron)
// 80's after dark - Retro Nightfall (retro)
// cheesecake- Delight (cheese)
// arch - Arcadia (arch)

export function ThemeSelector({
	open,
	setOpen,
	addClass,
	svgFill,
	themeSelectorColour: themeSelectorTheme,
}: themeProp) {
	const [value, setValue] = useState("");
	const [hoverTimeout, setHoverTimeout] = useState<null | NodeJS.Timeout>(null);
	const selectedTheme = useRef("arcadia");

	const modifiedClass = `w-full justify-between h-28 focus-visible:outline-none ${addClass}`;
	const bgTheme = themeSelectorTheme.split(" ")[0];

	const dispatch = useDispatch();

	const handleSetTheme = (newTheme: string) => {
		dispatch(setTheme(newTheme));
	};

	const handleMouseLeave = () => {
		if (hoverTimeout) {
			clearTimeout(hoverTimeout);
		}
		setTheme(themeMap[selectedTheme.current]);
	};

	return (
		<Popover open={open} onOpenChange={setOpen} modal={true}>
			<PopoverTrigger asChild>
				<Button
					variant="base"
					size="base"
					role="combobox"
					aria-expanded={open}
					className={modifiedClass}
				>
					<svg
						width="30px"
						height="30px"
						viewBox="0 0 24 24"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g
							id="🔍-Product-Icons"
							stroke="none"
							strokeWidth="1"
							fill="none"
							fillRule="evenodd"
						>
							<g
								className={svgFill}
								id="ic_fluent_dark_theme_24_filled"
								fill="#212121"
								fillRule="nonzero"
							>
								<path
									d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,20 L12,4 C16.418278,4 20,7.581722 20,12 C20,16.418278 16.418278,20 12,20 Z"
									id="🎨-Color"
								></path>
							</g>
						</g>
					</svg>
					{"Theme"}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className={`w-[500px] h-96 p-0 -translate-x-[600px] translate-y-32`}
				onMouseLeave={handleMouseLeave}
			>
				<Command className={bgTheme}>
					<CommandInput placeholder="Search theme..." />
					<CommandEmpty>No theme found.</CommandEmpty>
					<CommandGroup>
						<ScrollArea className="h-96 w-full">
							{themes.map((themeList) => (
								<CommandItem
									className={themeSelectorTheme}
									key={themeList.value}
									onSelect={(currentValue) => {
										if (hoverTimeout) {
											clearTimeout(hoverTimeout);
										}

										setValue(currentValue === value ? "" : currentValue);
										setOpen(false);
										handleSetTheme(themeMap[currentValue]);
										selectedTheme.current = currentValue;
									}}
									onMouseOver={() => {
										if (hoverTimeout) {
											clearTimeout(hoverTimeout);
										}

										const timeout = setTimeout(() => {
											handleSetTheme(themeMap[themeList.value]);
										}, 500);

										// Store the timeout ID in the state
										setHoverTimeout(timeout);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === themeList.value ? "opacity-100" : "opacity-0"
										)}
									/>
									{themeList.label}
								</CommandItem>
							))}
							<CommandItem
								className={themeSelectorTheme + ` h-12`}
							></CommandItem>
						</ScrollArea>
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
