export const colour = {
	"arch-bg": "#0c0d11",
	"arch-dull": "#454864",
	"arch-navbar": "#171a25",
	"arch-wrong": "#7ebab5", //selected(green)
	"arch-bright": "#f6f5f5",
  "arch-mono": "#ffffff",

	"dolphin-bg": "#003950",
	"dolphin-dull": "#00E4FF",
	"dolphin-bright": "#82eaff",
	"dolphin-wrong": "#ffbde6",
	"dolphin-navbar": "#014961",
  "dolphin-mono": "#000000",

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
