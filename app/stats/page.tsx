"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore/store";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
);

import { colour } from "@/assets/colour";

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
		title: {
			display: true,
			text: "Chart.js Line Chart",
		},
	},
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

// Function to generate random numbers between a range
const getRandomNumber = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

export const data = {
	labels,
	datasets: [
		{
			fill: false,
			label: "Words per min",
			data: labels.map(() => getRandomNumber(0, 100)),
			borderColor: colour["dolphin-main"],
			backgroundColor: "rgba(53, 162, 235, 0.5)",
			
		},
	],
};

export default function App() {
	const [isOpen, setIsOpen] = useState(false);
	const [hydrated, setHydrated] = useState(false);
	const [isTimerVisible, setIsTimerVisible] = useState(false);
	const [navigating, setNavigating] = useState(false);
	const theme = useSelector((state: RootState) => state.theme);

	return (
		<main
			className={`bg-${theme}-bg flex flex-row items-center justify-end w-full h-full gap-32`}
		>
			<Logo textColour={`${theme}-main`} secondaryColour={`${theme}-main`} />
			<Line
				data={data}
				options={options}
				width={80}
				height={100}
				className="w-10"
			/>
			<div></div>

			<Navbar
				themeOpen={isOpen}
				setThemeOpen={setIsOpen}
				setNavigating={setNavigating}
				textColour={`text-${theme}-dull`}
				borderTheme={`border-${theme}-navbar`}
				svgFill={`fill-${theme}-dull group-hover:fill-${theme}-bright`}
				hoverColour={`hover:bg-${theme}-navbar hover:border-${theme}-dull hover:text-${theme}-bright `}
				themeSelectorColour={`bg-${theme}-bg text-${theme}-dull hover:bg-slate-300 aria-selected:bg-${theme}-bright aria-selected:text-${theme}-bg`}
			/>
		</main>
	);
}
