export const colour = {
	"arch-main": "#7ebab5",
	"arch-bg": "#0c0d11",
	"arch-dull": "#454864",
	"arch-navbar": "#171a25",
	"arch-wrong": "#7ebab5", //selected(green)
	"arch-bright": "#f6f5f5",
	"arch-caret": "#7ebab5",
	"arch-mono": "#ffffff",


	"dolphin-main": "#ffcefb",
	"dolphin-bg": "#003950", //bg
	"dolphin-dull": "#00E4FF", //sub
	"dolphin-bright": "#82eaff", //text
	"dolphin-wrong": "#ffbde6", //error
	"dolphin-navbar": "#014961", //subalt
	"-dolphin-caret": "#00bcd4",
	"dolphin-mono": "#000000",


	"husqy-main": "#c58aff",
	"husqy-bg": "#000",
	"husqy-dull": "#972fff",
	"husqy-bright": "#ebd7ff",
	"husqy-wrong": "#da3333",
	"husqy-navbar": "#1e001e",
	"husqy-caret": "#c58aff",
	"husqy-mono": "#000000",


	"retro-main": "#fca6d1",
	"retro-bg": "#1b1d36",
	"retro-dull": "#99d6ea",
	"retro-bright": "#e1e7ec",
	"retro-wrong": "#fffb85",
	"retro-navbar": "#17182c",
	"retro-caret": "#99d6ea",
	"retro-mono": "#000000",

	"cheese-main": "#8e2949",
	"cheese-bg": "#fdf0d5",
	"cheese-dull": "#d91c81",
	"cheese-bright": "#3a3335",
	"cheese-wrong": "#5cf074",
	"cheese-navbar": "#f3e2bf",
	"cheese-caret": "#892948",
	"cheese-mono": "#ffffff",

	"magic-main": "#f5b1cc",
	"magic-bg": "#091f2c",
	"magic-dull": "#93e8d3",
	"magic-bright": "#a288d9",
	"magic-wrong": "#e45c96",
	"magic-navbar": "#071823",
	"magic-caret": "#a288d9",
	"magic-mono": "#000000",

	"tron-main": "#f0e800",
	"tron-bg": "#0d1c1c",
	"tron-dull": "#f60",
	"tron-bright": "#fff",
	"tron-wrong": "red",
	"tron-navbar": "#9c9191",
	"tron-caret": "#f0e800",
	"tron-mono": "#ffffff",
};

type ThemeKeys = "dolphin" | "arch"; // Define all theme keys
type StateKeys = "normal" | "hover"; // Define all state keys
type UsageKeys = "bg" | "text" | "border"; // Define all usage keys

interface ThemeObject {
	[themeKey: string]: {
		[stateKey: string]: {
			[usageKey: string]: {
				[colorKey: string]: string;
			};
		};
	};
}

export const themeObj: ThemeObject = {
	dolphin: {
		hover: {
			bg: {
				bg: "hover:bg-dolphin-bg",
				bright: "hover:bg-dolphin-bright",
				dull: "hover:bg-dolphin-dull",
				wrong: "hover:bg-dolphin-wrong",
				navbar: "hover:bg-dolphin-navbar",
			},

			text: {
				bg: "hover:text-dolphin-bg",
				bright: "hover:text-dolphin-bright",
				dull: "hover:text-dolphin-dull",
				wrong: "hover:text-dolphin-wrong",
				navbar: "hover:text-dolphin-navbar",
			},

			border: {
				bg: "hover:border-dolphin-bg",
				bright: "hover:border-dolphin-bright",
				dull: "hover:border-dolphin-dull",
				wrong: "hover:border-dolphin-wrong",
				navbar: "hover:border-dolphin-navbar",
			},
		},

		normal: {
			bg: {
				bg: "bg-dolphin-bg",
				bright: "bg-dolphin-bright",
				dull: "bg-dolphin-dull",
				wrong: "bg-dolphin-wrong",
				navbar: "bg-dolphin-navbar",
			},

			text: {
				bg: "text-dolphin-bg",
				bright: "text-dolphin-bright",
				dull: "text-dolphin-dull",
				wrong: "text-dolphin-wrong",
				navbar: "text-dolphin-navbar",
			},

			border: {
				bg: "border-dolphin-bg",
				bright: "border-dolphin-bright",
				dull: "border-dolphin-dull",
				wrong: "border-dolphin-wrong",
				navbar: "border-dolphin-navbar",
			},
		},
	},

	arch: {
		hover: {
			bg: {
				bg: "hover:bg-arch-bg",
				bright: "hover:bg-arch-bright",
				dull: "hover:bg-arch-dull",
				wrong: "hover:bg-arch-wrong",
				navbar: "hover:bg-arch-navbar",
			},

			text: {
				bg: "hover:text-arch-bg",
				bright: "hover:text-arch-bright",
				dull: "hover:text-arch-dull",
				wrong: "hover:text-arch-wrong",
				navbar: "hover:text-arch-navbar",
			},

			border: {
				bg: "hover:border-arch-bg",
				bright: "hover:border-arch-bright",
				dull: "hover:border-arch-dull",
				wrong: "hover:border-arch-wrong",
				navbar: "hover:border-arch-navbar",
			},
		},

		normal: {
			bg: {
				bg: "bg-arch-bg",
				bright: "bg-arch-bright",
				dull: "bg-arch-dull",
				wrong: "bg-arch-wrong",
				navbar: "bg-arch-navbar",
			},

			text: {
				bg: "text-arch-bg",
				bright: "text-arch-bright",
				dull: "text-arch-dull",
				wrong: "text-arch-wrong",
				navbar: "text-arch-navbar",
			},

			border: {
				bg: "border-arch-bg",
				bright: "border-arch-bright",
				dull: "border-arch-dull",
				wrong: "border-arch-wrong",
				navbar: "border-arch-navbar",
			},
		},
	},
};
