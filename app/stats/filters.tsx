import React from "react";
import { Martian_Mono } from "next/font/google";

const mono = Martian_Mono({ weight: "400", subsets: ["latin"] });

type FilterProps = {
	theme: string;
	filter: "all time" | "last 3 months" | "last month" | "last day";
	setFilter: (
		filter: "all time" | "last 3 months" | "last month" | "last day"
	) => void;
};
function Filters({ theme, filter, setFilter }: FilterProps) {
	return (
        <>
        <h2 className={`text-${theme}-dull`}>filters</h2>
		<div
			className={`w-fit h-36 bg-${theme}-navbar rounded-lg px-5 flex items-center justify-start gap-10 ${mono.className}`}
		>
			
		</div>
        </>
	);
}

export default Filters;
