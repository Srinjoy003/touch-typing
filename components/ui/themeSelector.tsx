"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

type themeProp = { setTheme: any; open: any; setOpen: any; addClass: string; svgFill: string };

const frameworks = [
	{
		value: "dolphin",
		label: "dolphin",
	},
	{
		value: "80's after dark",
		label: "80's after dark",
	},

	{
		value: "dark magic",
		label: "dark magic",
	},
	{
		value: "husqy",
		label: "husqy",
	},
	{
		value: "orange",
		label: "orange",
	},
	{
		value: "arch",
		label: "arch",
	},
	{
		value: "cheesecake",
		label: "cheesecake",
	},
];

export function ThemeSelector({ setTheme, open, setOpen, addClass, svgFill }: themeProp) {
	const [value, setValue] = useState("");
	const [hoverTimeout, setHoverTimeout] = useState<null | NodeJS.Timeout>(null);

	const modifiedClass = `w-full justify-between h-28 ${addClass}`;

	return (
		<Popover open={open} onOpenChange={setOpen} modal={true}>
			<PopoverTrigger asChild>
				<Button variant="base" size="base" role="combobox" aria-expanded={open} className={modifiedClass}>
					<svg width="30px" height="30px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
						<g id="🔍-Product-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
							<g className={svgFill} id="ic_fluent_dark_theme_24_filled" fill="#212121" fillRule="nonzero">
								<path d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,20 L12,4 C16.418278,4 20,7.581722 20,12 C20,16.418278 16.418278,20 12,20 Z" id="🎨-Color"></path>
							</g>
						</g>
					</svg>
					{/*value ? frameworks.find((framework) => framework.value === value)?.label : */ "Theme"}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[500px] h-96 p-0 -translate-x-[600px] translate-y-32">
				<Command>
					<CommandInput placeholder="Search theme..." />
					<CommandEmpty>No theme found.</CommandEmpty>
					<CommandGroup>
						<ScrollArea className="h-full w-full ">
							{frameworks.map((framework) => (
								<CommandItem
									key={framework.value}
									onSelect={(currentValue) => {
										if (hoverTimeout) {
											clearTimeout(hoverTimeout);
										}

										setValue(currentValue === value ? "" : currentValue);
										setOpen(false);
										setTheme(currentValue);
									}}
									onMouseOver={() => {
										if (hoverTimeout) {
											clearTimeout(hoverTimeout);
										}

										const timeout = setTimeout(() => {
											setTheme(framework.value);
										}, 500);

										// Store the timeout ID in the state
										setHoverTimeout(timeout);
									}}
									onMouseOut={() => {
										if (hoverTimeout) {
											clearTimeout(hoverTimeout);
										}
										setTheme(value);
									}}
								>
									<Check className={cn("mr-2 h-4 w-4", value === framework.value ? "opacity-100" : "opacity-0")} />
									{framework.label}
								</CommandItem>
							))}
						</ScrollArea>
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
