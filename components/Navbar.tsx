"use client";

import React from "react";
import { useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { ThemeSelector } from "./ui/themeSelector";
import { useDispatch } from "react-redux";
import { setLoading } from "@/app/reduxStore/loadingSlice";




type NavbarProp = {
	themeOpen: any;
	setThemeOpen: any;
	textColour: string;
	borderTheme: string;
	svgFill: string;
	hoverColour: string;
	themeSelectorColour: string;
};

function Navbar({
	themeOpen,
	setThemeOpen,
	textColour,
	borderTheme,
	svgFill,
	hoverColour,
	themeSelectorColour,
}: NavbarProp) {
	const navbarRef = useRef(null);

	const handleVisibility = useCallback((event: MouseEvent | KeyboardEvent) => {
		if (navbarRef.current) {
			const navbarDiv = navbarRef.current as HTMLDivElement;
			const pattern = /^[a-zA-Z0-9\s`~!@#$%^&*()_+={[}\]:;"'<,>.?/\\|,-]$/;

			if (event.type === "keydown") {
				const keyEvent = event as KeyboardEvent;

				if(pattern.test(keyEvent.key)){
					navbarDiv.classList.add("opacity-0");
					navbarDiv.classList.remove("opacity-100");
				}
			} else if (event.type === "mousemove") {
				navbarDiv.classList.add("opacity-100");
				navbarDiv.classList.remove("opacity-0");
			}
		}
	}, []);

	useEffect(() => {
		if (!themeOpen) {
			document.addEventListener("keydown", handleVisibility);
			document.addEventListener("mousemove", handleVisibility);

			return () => {
				document.removeEventListener("keydown", handleVisibility);
				document.addEventListener("mousemove", handleVisibility);
			};
		}
	}, [handleVisibility, themeOpen]);

	const modifiedClass = `flex flex-col items-center justify-center text-base h-1/2 w-44 first:rounded-2xl overflow-hidden opacity-100 transition-opacity duration-200 ${textColour} ${borderTheme}`;
	const innerClass = `flex flex-row gap-3 items-center justify-start w-full h-28 border-2 pl-4 cursor-pointer group ${borderTheme} ${hoverColour}`;

	const firstClass = " rounded-t-lg";
	const lastClass = " rounded-none rounded-b-lg";

	const dispatch = useDispatch();
	const handleSetLoading = () => {
		dispatch(setLoading(true));
	};

	return (
		<div ref={navbarRef} className={modifiedClass}>
			<Link className={innerClass + firstClass} href="/" onClick={handleSetLoading}>
				<svg
					className={svgFill}
					width="30px"
					height="30px"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M8 5H16C18.8284 5 20.2426 5 21.1213 5.87868C22 6.75736 22 8.17157 22 11V13C22 15.8284 22 17.2426 21.1213 18.1213C20.2426 19 18.8284 19 16 19H8C5.17157 19 3.75736 19 2.87868 18.1213C2 17.2426 2 15.8284 2 13V11C2 8.17157 2 6.75736 2.87868 5.87868C3.75736 5 5.17157 5 8 5ZM6 10C6.55228 10 7 9.55228 7 9C7 8.44772 6.55228 8 6 8C5.44772 8 5 8.44772 5 9C5 9.55228 5.44772 10 6 10ZM6 13C6.55228 13 7 12.5523 7 12C7 11.4477 6.55228 11 6 11C5.44772 11 5 11.4477 5 12C5 12.5523 5.44772 13 6 13ZM9 13C9.55228 13 10 12.5523 10 12C10 11.4477 9.55228 11 9 11C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13ZM9 10C9.55228 10 10 9.55228 10 9C10 8.44772 9.55228 8 9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10ZM12 10C12.5523 10 13 9.55228 13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9C11 9.55228 11.4477 10 12 10ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13ZM15 10C15.5523 10 16 9.55228 16 9C16 8.44772 15.5523 8 15 8C14.4477 8 14 8.44772 14 9C14 9.55228 14.4477 10 15 10ZM15 13C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11C14.4477 11 14 11.4477 14 12C14 12.5523 14.4477 13 15 13ZM18 10C18.5523 10 19 9.55228 19 9C19 8.44772 18.5523 8 18 8C17.4477 8 17 8.44772 17 9C17 9.55228 17.4477 10 18 10ZM18 13C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11C17.4477 11 17 11.4477 17 12C17 12.5523 17.4477 13 18 13ZM17.75 16C17.75 16.4142 17.4142 16.75 17 16.75H7C6.58579 16.75 6.25 16.4142 6.25 16C6.25 15.5858 6.58579 15.25 7 15.25H17C17.4142 15.25 17.75 15.5858 17.75 16Z"
					/>
				</svg>
				<p>Practise</p>
			</Link>

			<Link className={innerClass} href="/stats">
				<svg
					className={svgFill}
					width="30px"
					height="30px"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect x="0" fill="none" width="24" height="24" />
					<g>
						<path d="M21 21H3v-2h18v2zM8 10H4v7h4v-7zm6-4h-4v11h4V6zm6-3h-4v14h4V3z" />
					</g>
				</svg>
				<p>Stats</p>
			</Link>

			<Link className={innerClass} href="/typingTest">
				<svg
					className={svgFill}
					width="30px"
					height="30px"
					viewBox="0 0 512 512"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M256 54.28c-124.603 0-226 101.398-226 226 0 47.864 14.975 92.293 40.465 128.876l29.79-19.86c-17.188-24.545-28.708-53.362-32.696-84.577H96v-18H66.115c-.07-2.14-.115-4.284-.115-6.44 0-45.378 15.816-86.97 42.236-119.598l17.4 17.4 12.727-12.727-18.133-18.132C152.735 114.057 197.335 92.8 247 90.498v29.22h18V90.5c49.665 2.302 94.265 23.56 126.77 56.725l-18.133 18.132 12.726 12.727 17.4-17.4c26.42 32.63 42.237 74.22 42.237 119.6 0 2.154-.044 4.3-.115 6.437H416v18h28.44c-3.987 31.214-15.507 60.03-32.694 84.575l29.79 19.86C467.025 372.574 482 328.146 482 280.282c0-124.602-101.397-226-226-226zm15.83 66.23a144 160 0 0 1 74.608 100.062l49.966-17.568a160 160 0 0 0-4.3-7.012l-5.135 5.153-30.368-30.29-5.76-5.746 7.85-7.874a160 160 0 0 0-86.862-36.726zm156.15 89.844l-175.332 60.6C240.505 272.618 231 283.155 231 295.72c0 13.7 11.3 25 25 25 6.77 0 12.95-2.764 17.473-7.208L427.98 210.354zm-16.513 32.322l-60.713 40.72a144 160 0 0 1-56.6 108.323h76.057a160 160 0 0 0 39.763-68.572H398.48v-52.515h17.022a160 160 0 0 0-4.035-27.957zM128 421.72v36h256v-36H128z" />
				</svg>
				<p>Typing Test</p>
			</Link>

			<Link className={innerClass} href="	">
				<svg
					width="30px"
					height="25px"
					viewBox="0 0 20 20"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g
						id="Page-1"
						stroke="none"
						strokeWidth="1"
						fill="none"
						fillRule="evenodd"
					>
						<g
							className={svgFill}
							id="Dribbble-Light-Preview"
							transform="translate(-220.000000, -7759.000000)"
						>
							<g id="icons" transform="translate(56.000000, 160.000000)">
								<path
									d="M174,7611 L178,7611 L178,7607 L174,7607 L174,7611 Z M170,7607 L174,7607 L174,7603 L170,7603 L170,7607 Z M174,7603 L178,7603 L178,7599 L174,7599 L174,7603 Z M182,7599 L182,7603 L178,7603 L178,7607 L182,7607 L182,7619 L184,7619 L184,7599 L182,7599 Z M166,7607 L170,7607 L170,7611 L166,7611 L166,7619 L164,7619 L164,7599 L170,7599 L170,7603 L166,7603 L166,7607 Z"
									id="finish_line-[#104]"
								></path>
							</g>
						</g>
					</g>
				</svg>
				<p>Multiplayer</p>
			</Link>

			<ThemeSelector
				open={themeOpen}
				setOpen={setThemeOpen}
				addClass={innerClass + lastClass}
				svgFill={svgFill}
				themeSelectorColour={themeSelectorColour}
			/>
		</div>
	);
}

export default Navbar;
