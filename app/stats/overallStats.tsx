import React from "react";
import { Martian_Mono } from "next/font/google";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore/store";

const mono = Martian_Mono({ weight: "400", subsets: ["latin"] });

type StatBoxProps = {
	unit: string;
	dataSet: { value: string; speed: string; accuracy: string }[];
};
function StatBox({ unit, dataSet }: StatBoxProps) {
	const theme = useSelector((state: RootState) => state.theme);
	
	return (
		<div
			className={`w-fit h-36 bg-${theme}-navbar rounded-lg px-5 flex items-center justify-start gap-10 ${mono.className}`}
		>
			<div className="h-full flex gap-20 items-center justify-start">
				{dataSet.map((data, index) => {
					return (
						<div
							key={index}
							className="flex flex-col items-center justify-start gap-3"
						>
							<h3 className={`text-${theme}-dull text-xs`}>
								{data.value} {unit}
							</h3>
							<p className={`text-${theme}-bright text-4xl`}>{data.speed}</p>
							<p className={`text-${theme}-bright text-xl text-opacity-50`}>
								{data.accuracy}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default StatBox;
