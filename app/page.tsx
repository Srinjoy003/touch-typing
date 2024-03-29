"use client";
import TypingArea from "@/app/components/TypingArea";
import Keyboard from "@/app/components/Keyboard";
import Navbar from "@/app/components/Navbar";
import Logo from "@/app/components/Logo";
import { useState, createContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./reduxStore/store";
import "./globals.css";
import TextSelectorBar from "@/app/components/TextSelectorBar";
import Refresh from "@/app/components/Refresh";
import Profile from "./components/Profile";
import { setLogin } from "@/app/reduxStore/loginSlice";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import Loading from "./components/Loading";
import { usePathname } from "next/navigation";

function Home() {
	const theme = useSelector((state: RootState) => state.theme);

	const [hydrated, setHydrated] = useState(false);

	const [isOpen, setIsOpen] = useState(false);
	const [navigating, setNavigating] = useState(false);
	const dispatch = useDispatch();
	const username = useSelector((state: RootState) => state.login);

	useEffect(() => {
		if (username) return;
		const login = async () => {
			const encryptedUsername = Cookies.get("username");
			const encryptiondData = { encryptedUsername };

			if (encryptedUsername) {
				try {
					const response = await fetch("../api/decryption", {
						method: "POST",
						body: JSON.stringify(encryptiondData),
						headers: {
							"Content-Type": "application/json",
						},
					});

					if (response.ok) {
						const responseData = await response.json();
						const username = responseData.username;
						dispatch(setLogin(username));
					} else {
						const errorMessage = await response.text();
						console.log(errorMessage);
					}
				} catch (error) {}
			}
		};

		login();
	}, [dispatch, username]);

	return (
		<>
			<div
				className={`bg-${theme}-bg text-${theme}-wrong w-screen h-full ${
					hydrated && !navigating ? "hidden" : ""
				}`}
			>
				<Loading />
			</div>
			<div
				className={`bg-${theme}-bg flex flex-row items-center justify-end w-full h-full gap-32 ${
					hydrated && !navigating ? "" : "hidden"
				}`}
			>
				<Logo
					className="absolute top-12 left-12"
					textColour={`${theme}-main`}
					secondaryColour={`${theme}-main`}
				/>
				<Profile className="absolute right-10 top-10" />

				<div className="flex flex-col items-start h-fit justify-start gap-28 translate-y-10 translate-x-20">
					<div className="flex flex-col gap-24">
						<div className="w-full flex items-center justify-center translate-x-6 translate-y-10 scale-75">
							<TextSelectorBar
								isTypingTest={false}
								themeSelectorOpen={isOpen}
								borderSelectColour={`border-${theme}-main`}
								borderColour={`border-${theme}-dull border-opacity-50`}
								textColour={`text-${theme}-dull`}
								textSelectColour={`text-${theme}-main`}
								hoverColour={`hover:text-${theme}-bright hover:border-${theme}-dull hover:bg-${theme}-navbar`}
								svgColour={`fill-${theme}-dull`}
								svgSelectColour={`fill-${theme}-main`}
								svgHoverColour={`group-hover:fill-${theme}-bright`}
							/>
						</div>
						<div className={`translate-x-6 mb-10 translate-y-10`}>
							<TypingArea
								hydrated={hydrated}
								setHydrated={setHydrated}
								themeOpen={isOpen}
								textColour={`text-${theme}-dull`}
								textColourCorrect={`text-${theme}-bright`}
								textColourIncorrect={`text-${theme}-wrong`}
								caretColour={`border-${theme}-main`}
								wordCountColour={`text-${theme}-main`}
							/>
						</div>
						<Refresh
							themeSelectorOpen={isOpen}
							colour={`text-${theme}-dull`}
							hoverColour={`hover:text-${theme}-bright`}
						/>
					</div>
					<div className="translate-x-10 translate-y-6 ml-24 scale-110">
						<Keyboard
							themeSelectorOpen={isOpen}
							theme={`bg-${theme}-bg`}
							funcTheme={`bg-${theme}-bg`}
							pressedTheme={`bg-${theme}-dull`}
							backgroundTheme={`bg-${theme}-navbar`}
							textColour={`text-${theme}-dull`}
							textPressedColour={`text-${theme}-mono`}
						/>
					</div>
				</div>
				<Navbar
					themeOpen={isOpen}
					setThemeOpen={setIsOpen}
					setNavigating={setNavigating}
					textColour={`text-${theme}-dull`}
					borderTheme={`border-${theme}-dull`}
					svgFill={`fill-${theme}-dull group-hover:fill-${theme}-bright`}
					hoverColour={`hover:bg-${theme}-navbar hover:border-${theme}-dull hover:text-${theme}-bright `}
					themeSelectorColour={`bg-${theme}-bg text-${theme}-dull hover:bg-${theme}-bright aria-selected:bg-${theme}-bright aria-selected:text-${theme}-bg`}
				/>
			</div>
		</>
	);
}

export default Home;
