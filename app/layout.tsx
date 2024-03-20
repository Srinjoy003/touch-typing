import "./globals.css";
import type { Metadata } from "next";
import { Inter, Martian_Mono } from "next/font/google";
import { Providers } from "./reduxStore/provider";

const inter = Inter({ subsets: ["latin"] });
const mono = Martian_Mono({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Key Ninja - Typing Speed Mastery",
	description:
		"Enhance your typing speed and accuracy with Key Ninja! Practice typing tests, improve your skills, and track your progress. Start typing like a ninja today!",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const modifiedClass = `${inter.className} h-screen overflow-hidden`;
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/icon.svg" type="image/svg" />
			</head>
			<body className={modifiedClass}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
