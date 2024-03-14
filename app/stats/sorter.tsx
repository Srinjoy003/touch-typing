import React, { useState } from "react";
import { Martian_Mono } from "next/font/google";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore/store";
import { MouseEvent } from "react";

const mono = Martian_Mono({ weight: "400", subsets: ["latin"] });

type sortOptions = "speed" | "raw speed" | "accuracy" | "date";

type SorterProps = {
	filter?: sortOptions;
	setFilter?: (filter: sortOptions) => void;
};
function Sorter({ filter, setFilter }: SorterProps) {
	const theme = useSelector((state: RootState) => state.theme);
	const buttonClassname = `w-48 hover:bg-${theme}-bright hover:text-${theme}-bg rounded-lg py-2 text-sm transition duration-300 `;
	const [option, setOption] = useState<sortOptions>("date");

	const handleSorterSelection = (event: MouseEvent<HTMLButtonElement>) => {
		const innerHTML = event.currentTarget.innerHTML as sortOptions;
		setOption(innerHTML);
	};

	return (
		<div className="flex flex-col gap-7 mt-20">
			<h2 className={`text-${theme}-dull ${mono.className} text-lg`}>
				sort by
			</h2>
			<div
				className={`w-fit flex items-center justify-start gap-10 ${mono.className}`}
			>
				<button
					className={
						buttonClassname +
						`${
							option === "speed"
								? `bg-${theme}-main text-${theme}-bg`
								: `bg-${theme}-navbar text-${theme}-bright`
						}`
					}
					onClick={handleSorterSelection}
				>
					speed
				</button>
				<button
					className={
						buttonClassname +
						`${
							option === "raw speed"
								? `bg-${theme}-main text-${theme}-bg`
								: `bg-${theme}-navbar text-${theme}-bright`
						}`
					}
					onClick={handleSorterSelection}
				>
					raw speed
				</button>
				<button
					className={
						buttonClassname +
						`${
							option === "accuracy"
								? `bg-${theme}-main text-${theme}-bg`
								: `bg-${theme}-navbar text-${theme}-bright`
						}`
					}
					onClick={handleSorterSelection}
				>
					accuracy
				</button>
				<button
					className={
						buttonClassname +
						`${
							option === "date"
								? `bg-${theme}-main text-${theme}-bg`
								: `bg-${theme}-navbar text-${theme}-bright`
						}`
					}
					onClick={handleSorterSelection}
				>
					date
				</button>
			</div>
		</div>
	);
}

export default Sorter;
