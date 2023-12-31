import "./globals.css";
import type { Metadata } from "next";
import { Inter} from "next/font/google";
import { Providers } from "./reduxStore/provider";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
	title: "Touch Typing",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const modifiedClass = `${inter.className} h-screen overflow-hidden`;
	return (
		<html lang="en">
			<body className={modifiedClass}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
