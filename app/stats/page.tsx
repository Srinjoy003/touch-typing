"use client";

import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore/store";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";
import Profile from "./profile";
import StatBox from "./overallStats";
import DetailedStats from "./detailedStats";
import Filters from "./filters";
import DataTable from "./dataTable";
import Sorter from "./sorter";
import { organizeData, DataSet, TableStats, ProfileStats } from "./organizeData";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setLogin } from "../reduxStore/loginSlice";
import Loading from "../components/Loading";
import { filterOptions } from "./filters";
import { sortOptions } from "./sorter";

export default function App() {
	const [isOpen, setIsOpen] = useState(false);
	const [navigating, setNavigating] = useState(false);
	const [loading, setLoading] = useState(true);
	const [timeTestStats, setTimeTestStats] = useState([
		{ value: "15", speed: "-", accuracy: "-" },
		{ value: "30", speed: "-", accuracy: "-" },
		{ value: "60", speed: "-", accuracy: "-" },
		{ value: "120", speed: "-", accuracy: "-" },
	]);

	const [wordTestStats, setWordTestStats] = useState([
		{ value: "10", speed: "-", accuracy: "-" },
		{ value: "25", speed: "-", accuracy: "-" },
		{ value: "50", speed: "-", accuracy: "-" },
		{ value: "100", speed: "-", accuracy: "-" },
	]);

	
	const [profileStats, setProfileStats] = useState(
		{ testTaken: "-", avgSpeed: "-", avgAccuracy: "-" },
		);

	const [detailedStats, setDetailedStats] = useState([
		[
			{ label: "tests taken", value: "-" },
			{ label: "words typed", value: "-" },
			{ label: "characters typed", value: "-" },
		],
		[
			{ label: "highest wpm", value: "-" },
			{ label: "average wpm", value: "-" },
			{ label: "average wpm(last 10 tests)", value: "-" },
		],
		[
			{ label: "highest accuracy", value: "-" },
			{ label: "average accuracy", value: "-" },
			{ label: "average accuracy(last 10 tests)", value: "-" },
		],
	]);

	const [tableStats, setTableStats] = useState<TableStats>([]);
	const [filter, setFilter] = useState<filterOptions>("all time");
	const [sorter, setSorter] = useState<sortOptions>("date");
	const [rowCount, setRowCount] = useState(10);
	const isFirstLoad = useRef(true);

	const theme = useSelector((state: RootState) => state.theme);
	const username = useSelector((state: RootState) => state.login);
	const dispatch = useDispatch();

	useEffect(() => {
		const username = Cookies.get("username");
		if (username) {
			dispatch(setLogin(username));
		}
	}, [dispatch]);

	useEffect(() => {
		const fetchStats = async () => {
			if (isFirstLoad.current) {
				setLoading(true);
			}
			if (!username) return;
			try {
				const response = await fetch(
					`../api/stats?username=${encodeURIComponent(
						username
					)}&filter=${encodeURIComponent(filter)}&sorter=${encodeURIComponent(
						sorter
					)}&rowCount=${encodeURIComponent(
						rowCount
					)}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				if (response.ok) {
					const responseJson: DataSet = await response.json();

					console.log(organizeData(responseJson));
					const {
						timeTestStats,
						wordTestStats,
						detailedTestStats,
						tableStats,
						profileTestStats
					} = organizeData(responseJson);

					setTimeTestStats(timeTestStats);
					setWordTestStats(wordTestStats);
					setDetailedStats(detailedTestStats);
					setTableStats(tableStats);
					setProfileStats(profileTestStats)
				}
			} catch (error) {
				console.error(error);
			} finally {
				if (isFirstLoad.current) {
					setLoading(false);
					isFirstLoad.current = false;
				}
			}
		};

		fetchStats();
	}, [username, filter, sorter, rowCount]);

	// const timeTestStats = [
	// 	{ value: 15, speed: 20, accuracy: 90 },
	// 	{ value: 30, speed: 30, accuracy: 100 },
	// 	{ value: 60, speed: 80, accuracy: 90 },
	// 	{ value: 120, speed: 20, accuracy: 90 },
	// ];

	// const wordTestStats = [
	// 	{ value: 10, speed: 20, accuracy: 90 },
	// 	{ value: 25, speed: 30, accuracy: 100 },
	// 	{ value: 50, speed: 80, accuracy: 90 },
	// 	{ value: 100, speed: 20, accuracy: 90 },
	// ];

	// const detailedStats = [
	// 	[
	// 		{ label: "tests taken", value: "10" },
	// 		{ label: "words typed", value: "2000" },
	// 		{ label: "characters typed", value: "100" },
	// 	],
	// 	[
	// 		{ label: "highest wpm", value: "10" },
	// 		{ label: "average wpm", value: "80" },
	// 		{ label: "average wpm(last 10 tests)", value: "100" },
	// 	],
	// 	[
	// 		{ label: "highest accuracy", value: "100%" },
	// 		{ label: "average accuracy", value: "93%" },
	// 		{ label: "average accuracy(last 10 tests)", value: "90%" },
	// 	],
	// ];

	// const tableStats = [
	// 	{
	// 		wpm: "20",
	// 		raw: "40",
	// 		accuracy: "90%",
	// 		chars: "40/20/20",
	// 		mode: "words 50",
	// 		date: "10:10:10",
	// 	},
	// 	{
	// 		wpm: "20",
	// 		raw: "40",
	// 		accuracy: "90%",
	// 		chars: "40/20/20",
	// 		mode: "words 50",
	// 		date: "10:10:10",
	// 	},
	// 	{
	// 		wpm: "20",
	// 		raw: "40",
	// 		accuracy: "90%",
	// 		chars: "40/20/20",
	// 		mode: "words 50",
	// 		date: "10:10:10",
	// 	},
	// 	{
	// 		wpm: "20",
	// 		raw: "40",
	// 		accuracy: "90%",
	// 		chars: "40/20/20",
	// 		mode: "words 50",
	// 		date: "10:10:10",
	// 	},
	// 	{
	// 		wpm: "20",
	// 		raw: "40",
	// 		accuracy: "90%",
	// 		chars: "40/20/20",
	// 		mode: "words 50",
	// 		date: "10:10:10",
	// 	},
	// 	{
	// 		wpm: "20",
	// 		raw: "40",
	// 		accuracy: "90%",
	// 		chars: "40/20/20",
	// 		mode: "words 50",
	// 		date: "10:10:10",
	// 	},
	// 	{
	// 		wpm: "20",
	// 		raw: "40",
	// 		accuracy: "90%",
	// 		chars: "40/20/20",
	// 		mode: "words 50",
	// 		date: "10:10:10",
	// 	},
	// ];

	const paragraphs = Array.from({ length: 100 }, (_, index) => (
		<p key={index}>Paragraph {index + 1}</p>
	));
	if (loading) return <Loading />;
	else
		return (
			<main
				className={`bg-${theme}-bg flex flex-col items-start justify-start w-full gap-32 h-screen overflow-y-auto scrollbar scrollbar-thumb-${theme}-dull scrollbar-track-${theme}-navbar scrollbar-thin`}
			>
				<Logo
					className="ml-12 mt-12 -mb-56"
					textColour={`${theme}-main`}
					secondaryColour={`${theme}-main`}
				/>

				<main className="mt-40 flex flex-col gap-16 ml-20">
					<Profile username={username} profileStats={profileStats}/>
					<div className="flex gap-4">
						<StatBox dataSet={timeTestStats} unit="seconds" />
						<StatBox dataSet={wordTestStats} unit="words" />
					</div>
					<Filters filter={filter} setFilter={setFilter} />
					<DetailedStats dataSet={detailedStats} />
					<Sorter sorter={sorter} setSorter={setSorter} setRowCount={setRowCount}/>
					<DataTable
						dataSet={tableStats}
						rowCount={rowCount}
						setRowCount={setRowCount}
					/>
				</main>

				<Navbar
					modifyClass="absolute right-5 top-1/3"
					themeOpen={isOpen}
					setThemeOpen={setIsOpen}
					setNavigating={setNavigating}
					textColour={`text-${theme}-bright`}
					borderTheme={`border-${theme}-dull border-opacity-50`}
					svgFill={`fill-${theme}-dull group-hover:fill-${theme}-bright`}
					hoverColour={`hover:bg-${theme}-navbar hover:border-${theme}-dull hover:text-${theme}-bright`}
					themeSelectorColour={`bg-${theme}-bg text-${theme}-dull hover:bg-slate-300 aria-selected:bg-${theme}-bright aria-selected:text-${theme}-bg`}
				/>

				{/* {paragraphs} */}
			</main>
		);
}
