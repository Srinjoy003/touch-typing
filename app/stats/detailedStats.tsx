import React from "react";
import { Martian_Mono } from "next/font/google";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore/store";

const mono = Martian_Mono({ weight: "400", subsets: ["latin"] });

type DetailedStatsProps = {
	dataSet: { label: string; value: string }[][];
};
function DetailedStats({ dataSet }: DetailedStatsProps) {
	const theme = useSelector((state: RootState) => state.theme);

	return (
		<div
			className={`h-fit w-fit rounded-lg px-5 flex flex-col items-start justify-center gap-20 ${mono.className}`}
		>
			{dataSet.map((row, rowIndex) => {
				return (
					<div key={v4()} className="flex items-start justify-center gap-40">
						{row.map((data, col) => {
							return (
								<div
									key={v4()}
									className={`${
										col < 2 ? "w-40" : ""
									} flex flex-col items-center justify-start gap-4`}
								>
									<h3 className={`text-${theme}-dull text-sm`}>{data.label}</h3>
									<p className={`text-${theme}-bright text-5xl`}>
										{data.value}
									</p>
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
}

export default DetailedStats;
