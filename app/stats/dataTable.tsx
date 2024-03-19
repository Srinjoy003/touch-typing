import React from "react";
import { Martian_Mono } from "next/font/google";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore/store";
import { v4 } from "uuid";

const mono = Martian_Mono({ weight: "400", subsets: ["latin"] });

type DataTableProps = {
	dataSet: {
		wpm: string;
		raw: string;
		accuracy: string;
		chars: string;
		mode: string;
		date: string;
	}[];

	rowCount: number;
	setRowCount: (callback: (currentRowCount: number) => number) => void;
};
function DataTable({ dataSet, rowCount, setRowCount }: DataTableProps) {
	const theme = useSelector((state: RootState) => state.theme);
	const innerClass = `w-28`;

	const handleLoadRows = () => {
		setRowCount((currentRowCount: number) => currentRowCount + 10);
	};

	if (dataSet.length === 0) {
		return (
			<div
				className={`w-2/3 flex flex-col items-center justify-center h-96 ${mono.className} text-${theme}-bright mb-28`}
			>
				<h3>No data found. Check your filters.</h3>
			</div>
		);
	}
	return (
		<div
			className={`w-fit flex flex-col items-center justify-start ${mono.className} mb-28`}
		>
			<div
				className={`rounded-lg text-${theme}-dull flex items-center justify-start gap-20 px-10 text-xs mb-2`}
			>
				<p className={innerClass}>wpm</p>
				<p className={innerClass}>raw</p>
				<p className={innerClass}>accuracy</p>
				<p className={innerClass}>chars</p>
				<p className={innerClass}>mode</p>
				<p className={innerClass}>date</p>
			</div>
			{dataSet.map((dataRow, index) => {
				return (
					<div
						className={`rounded-lg ${
							index % 2 === 0 ? `bg-${theme}-navbar` : `bg-${theme}-bg`
						} text-${theme}-bright flex items-center justify-start gap-20 px-10 py-4 text-sm`}
						key={v4()}
					>
						<p className={innerClass}>{dataRow.wpm}</p>
						<p className={innerClass}>{dataRow.raw}</p>
						<p className={innerClass}>{dataRow.accuracy}</p>
						<p className={innerClass}>{dataRow.chars}</p>
						<p className={innerClass}>{dataRow.mode}</p>
						<p className={innerClass}>{dataRow.date}</p>
					</div>
				);
			})}
			{rowCount == dataSet.length && (
				<button
					className={`bg-${theme}-navbar text-${theme}-bright hover:bg-${theme}-bright hover:text-${theme}-bg mt-8 w-full rounded-lg py-2 text-sm`}
					onClick={handleLoadRows}
				>
					load more
				</button>
			)}
		</div>
	);
}

export default DataTable;
