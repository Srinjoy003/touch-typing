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
import Profile from "./profile";
import StatBox from "./overallStats";
import DetailedStats from "./detailedStats";

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

	const timeTestStats = [
		{ value: 15, speed: 20, accuracy: 90 },
		{ value: 30, speed: 30, accuracy: 100 },
		{ value: 60, speed: 80, accuracy: 90 },
		{ value: 120, speed: 20, accuracy: 90 },
	];

	const wordTestStats = [
		{ value: 10, speed: 20, accuracy: 90 },
		{ value: 25, speed: 30, accuracy: 100 },
		{ value: 50, speed: 80, accuracy: 90 },
		{ value: 100, speed: 20, accuracy: 90 },
	];

	const detailedStats = [
		[
			{ label: "tests taken", value: "10" },
			{ label: "words typed", value: "2000" },
			{ label: "total test time", value: "00:10:59" },
		],
		[
			{ label: "highest wpm", value: "10" },
			{ label: "average wpm", value: "80" },
			{ label: "average wpm(last 10 tests)", value: "100" },
		],
		[
			{ label: "highest accuracy", value: "100%" },
			{ label: "average accuracy", value: "93%" },
			{ label: "average accuracy(last 10 tests)", value: "90%" },
		],
		[
			{ label: "tests taken", value: "10" },
			{ label: "words typed", value: "2000" },
			{ label: "total test time", value: "00:10:59" },
		],
	];

	const paragraphs = Array.from({ length: 100 }, (_, index) => (
		<p key={index}>Paragraph {index + 1}</p>
	));
	return (
		<main
			className={`bg-${theme}-bg flex flex-col items-start justify-start w-full gap-32 h-screen overflow-y-auto`}
		>
			<Logo textColour={`${theme}-main`} secondaryColour={`${theme}-main`} />
			{/* <Line
				data={data}
				options={options}
				width={80}
				height={100}
				className="w-10"
			/> */}
			<main className="mt-40 flex flex-col gap-16 ml-20">
				<Profile theme={theme} />
				<div className="flex gap-4">
					<StatBox theme={theme} dataSet={timeTestStats} unit="seconds" />
					<StatBox theme={theme} dataSet={wordTestStats} unit="words" />
				</div>
				<DetailedStats theme={theme} dataSet={detailedStats} />
			</main>

			<Navbar
				modifyClass="absolute right-5 top-1/3"
				themeOpen={isOpen}
				setThemeOpen={setIsOpen}
				setNavigating={setNavigating}
				textColour={`text-${theme}-dull`}
				borderTheme={`border-${theme}-dull border-opacity-50`}
				svgFill={`fill-${theme}-dull group-hover:fill-${theme}-bright`}
				hoverColour={`hover:bg-${theme}-navbar hover:border-${theme}-dull hover:text-${theme}-bright `}
				themeSelectorColour={`bg-${theme}-bg text-${theme}-dull hover:bg-slate-300 aria-selected:bg-${theme}-bright aria-selected:text-${theme}-bg`}
			/>

			{/* {paragraphs} */}
		</main>
	);
}
