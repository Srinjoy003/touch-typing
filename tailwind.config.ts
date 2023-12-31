import type { Config } from "tailwindcss";
import { colour } from "./assets/colour";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],

	safelist: [
		{
			pattern:
				/^(bg|text|border|fill|decoration|from|to)-(dolphin|arch|retro|cheese|husqy|magic|tron)(-[A-Za-z0-9_-]+)?$/,
			variants: ["hover", "group-hover", "aria-selected", "focus"],
		},
	],

	theme: {
		extend: {
			colors: {
				...colour,
			},

			keyframes: {
				pulse: {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0" },
				},
			},

			animation: {
				pulse: "pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
			},
		},
	},
	plugins: [],
};
export default config;
