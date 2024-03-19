import React, { useState } from "react";
import { Martian_Mono } from "next/font/google";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore/store";
import { MouseEvent } from "react";

const mono = Martian_Mono({ weight: "400", subsets: ["latin"] });
export type filterOptions =
	| "all time"
	| "last 3 months"
	| "last month"
	| "last week"
	| "last day";
type FilterProps = {
	filter: filterOptions;
	setFilter: (filter: filterOptions) => void;
};
function Filters({ filter, setFilter }: FilterProps) {
	const theme = useSelector((state: RootState) => state.theme);
	const buttonClassname = `w-48 hover:bg-${theme}-bright hover:text-${theme}-bg rounded-lg py-2 text-sm transition duration-300 `;

	const handleFilterSelection = (event: MouseEvent<HTMLButtonElement>) => {
		const innerHTML = event.currentTarget.innerHTML as filterOptions;
		setFilter(innerHTML);
	};

	return (
		<div className="flex flex-col gap-7 mt-10">
			<h2 className={`text-${theme}-dull ${mono.className} text-lg`}>
				filters
			</h2>
			<div
				className={`w-fit flex items-center justify-start gap-10 ${mono.className}`}
			>
				<button
					className={
						buttonClassname +
						`${
							filter === "last day"
								? `bg-${theme}-main text-${theme}-bg`
								: `bg-${theme}-navbar text-${theme}-bright`
						}`
					}
					onClick={handleFilterSelection}
				>
					last day
				</button>
				<button
					className={
						buttonClassname +
						`${
							filter === "last week"
								? `bg-${theme}-main text-${theme}-bg`
								: `bg-${theme}-navbar text-${theme}-bright`
						}`
					}
					onClick={handleFilterSelection}
				>
					last week
				</button>
				<button
					className={
						buttonClassname +
						`${
							filter === "last month"
								? `bg-${theme}-main text-${theme}-bg`
								: `bg-${theme}-navbar text-${theme}-bright`
						}`
					}
					onClick={handleFilterSelection}
				>
					last month
				</button>
				<button
					className={
						buttonClassname +
						`${
							filter === "last 3 months"
								? `bg-${theme}-main text-${theme}-bg`
								: `bg-${theme}-navbar text-${theme}-bright`
						}`
					}
					onClick={handleFilterSelection}
				>
					last 3 months
				</button>
				<button
					className={
						buttonClassname +
						`${
							filter === "all time"
								? `bg-${theme}-main text-${theme}-bg`
								: `bg-${theme}-navbar text-${theme}-bright`
						}`
					}
					onClick={handleFilterSelection}
				>
					all time
				</button>
			</div>
		</div>
	);
}

export default Filters;
