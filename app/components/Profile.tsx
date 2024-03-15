import React from "react";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore/store";
import { Martian_Mono } from "next/font/google";
import { IoLogOut } from "react-icons/io5";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setLogin } from "../reduxStore/loginSlice";
import Link from "next/link";

const mono = Martian_Mono({ weight: "400", subsets: ["latin"] });

type ProfileProps = { className: string };

function Profile({ className }: ProfileProps) {
	const theme = useSelector((state: RootState) => state.theme);
	const username = useSelector((state: RootState) => state.login);
	const dispatch = useDispatch();

	const handleLogOut = () => {
		Cookies.remove("username");
		dispatch(setLogin(null))
	};

	return (
		<div
			className={`${className} ${
				mono.className
			} text-${theme}-dull flex gap-7 ${username ? "text-2xl" : "text-4xl"}`}
		>
			<Link
				href={`${username ? "/stats" : "/login"}`}
				className={`flex gap-1 items-center cursor-pointer hover:text-${theme}-bright`}
			>
				<CgProfile />
				<p className={`${username ? "text-sm" : "text-base"} font-light`}>
					{username ?? "Log In"}
				</p>
			</Link>
			{username && (
				<button className={`hover:text-${theme}-bright`} onClick={handleLogOut}>
					<IoLogOut />
				</button>
			)}
		</div>
	);
}

export default Profile;
