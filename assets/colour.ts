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
	"dolphin-caret": "#00bcd4",
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

	"crimson-main": "#ffadad",
	"crimson-bg": "#00002e", //bg
	"crimson-dull": "#ff3d8b", //sub
	"crimson-bright": "#f1deef", //text
	"crimson-wrong": "#8fecff", //error
	"crimson-navbar": "#060548", //subalt
	"crimson-caret": "#ffffff",
	"crimson-mono": "#000000",

	"retrocast-main": "#88dbdf",
	"retrocast-bg": "#07737a", //bg
	"retrocast-dull": "#f3e03b", //sub
	"retrocast-bright": "#ffffff", //text
	"retrocast-wrong": "#ff585d", //error
	"retrocast-navbar": "#26858b", //subalt
	"retrocast-caret": "#88dbdf",
	"retrocast-mono": "#ffffff",

	"sonokai-main": "#9ed072",
	"sonokai-bg": "#2c2e34", //bg
	"sonokai-dull": "#e7c664", //sub
	"sonokai-bright": "#e2e2e3", //text
	"sonokai-wrong": "#fc5d7c", //error
	"sonokai-navbar": "#23242", //subalt
	"sonokai-caret": "#f38c71",
	"sonokai-mono": "#000000",

	"soaring-main": "#55c6f0",
	"soaring-bg": "#fff9f2", //bg
	"soaring-dull": "#1e107a", //sub
	"soaring-bright": "#1d1e1e", //text
	"soaring-wrong": "#fb5745", //error
	"soaring-navbar": "#e5ddd4", //subalt
	"soaring-caret": "#1e107a",
	"soaring-mono": "#000000",

	"fruit-main": "#f4a3b4",
	"fruit-bg": "#7c2142", //bg
	"fruit-dull": "#9994b8", //sub
	"fruit-bright": "#ffffff", //text
	"fruit-wrong": "#deb80b", //error
	"fruit-navbar": "#833c5e", //subalt
	"fruit-caret": "#ffffff",
	"fruit-mono": "#000000",

	"nebula-main": "#be3c88",
	"nebula-bg": "#212135", //bg
	"nebula-dull": "#19b3b8", //sub
	"nebula-bright": "#838686", //text
	"nebula-wrong": "#ca4754", //error
	"nebula-navbar": "#191928", //subalt
	"nebula-caret": "#78c729",
	"nebula-mono": "#000000",

	"honey-main": "#fff546",
	"honey-bg": "#f2aa00;", //bg
	"honey-dull": "#a66b00", //sub
	"honey-bright": "#f3eecb", //text
	"honey-wrong": "#df3333", //error
	"honey-navbar": "#e19e00", //subalt
	"honey-caret": "#79520",
	"honey-mono": "#000000",

	"earthsong-main": "#509452",
	"earthsong-bg": "#292521", //bg
	"earthsong-dull": "#f5ae2d", //sub
	"earthsong-bright": "#e6c7a8", //text
	"earthsong-wrong": "#7e2a33", //error
	"earthsong-navbar": "#1d1b18", //subalt
	"earthsong-caret": "#1298ba",
	"earthsong-mono": "#000000",

};



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
