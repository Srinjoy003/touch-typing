import React from "react";
import { Itim } from "next/font/google";
import { Martian_Mono } from "next/font/google";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore/store";

const mono = Martian_Mono({ weight: "400", subsets: ["latin"] });

type ProfileProps = { username: string | null };
function Profile({ username }: ProfileProps) {
	const theme = useSelector((state: RootState) => state.theme);

	const calculateFontSize = () => {
		if (!username) return "text-4xl";
		if (username.length > 23) return "text-base";
		if (username.length > 19) return "text-xl";
		if (username.length > 14) return "text-2xl";
		if (username.length > 10) return "text-3xl";
		return "text-4xl";
	};

	return (
		<div
			className={`w-[1200px] h-36 bg-${theme}-navbar rounded-lg px-5 flex items-center justify-start gap-10 ${mono.className}`}
		>
			<div className="h-full flex gap-5 items-center justify-start">
				<svg
					className={`w-24 h-24 rounded-full bg-${theme}-dull border-0`}
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
						strokeLinejoin="round"
						strokeLinecap="round"
						strokeWidth="1.5"
						className={`fill-${theme}-bg stroke-${theme}-bg`}
					/>
					<path
						d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
						strokeLinejoin="round"
						strokeLinecap="round"
						strokeWidth="1.5"
						className={`fill-${theme}-bg stroke-${theme}-bg`}
					/>
				</svg>

				<h1
					className={`text-${theme}-bright ${calculateFontSize()} w-56 text-center`}
				>
					{username ?? "-"}
				</h1>
			</div>

			<div className={`h-[80%] w-2 bg-${theme}-bg rounded-lg ml-10`}></div>

			<div className="h-full flex gap-32 items-center justify-start ml-5">
				<div className="text-center">
					<h3 className={`text-${theme}-dull text-sm`}>tests taken</h3>
					<p className={`text-${theme}-bright text-3xl`}>100</p>
				</div>

				<div className="text-center">
					<h3 className={`text-${theme}-dull text-sm`}>total test time</h3>
					<p className={`text-${theme}-bright text-3xl`}>10:10:10</p>
				</div>
				<div className="text-center">
					<h3 className={`text-${theme}-dull text-sm`}>average speed</h3>
					<p className={`text-${theme}-bright text-3xl`}>40</p>
				</div>
			</div>
		</div>
	);
}

export default Profile;
