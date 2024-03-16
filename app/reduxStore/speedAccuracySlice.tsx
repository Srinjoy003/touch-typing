// themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const speedAccuracySlice = createSlice({
	name: "speedAccuracy",
	initialState: {
		totalChar: 0,
		correctChar: 0,
		speed: 0,
		accuracy: 0,
		time: 0,
		wordCount: 0,
	},
	reducers: {
		incrementTotalChar: (state) => {
			state.totalChar += 1;
		},
		incrementCorrectChar: (state) => {
			state.correctChar += 1;
		},

		incrementWordCount: (state) => {
			state.wordCount += 1;
		},

		setSpeed: (state, action) => {
			state.speed = action.payload;
		},

		setAccuracy: (state, action) => {
			state.accuracy = action.payload;
		},
		resetTimeAccuracy: (state) => {
			state.totalChar = 0;
			state.correctChar = 0;
			state.speed = 0;
			state.accuracy = 0;
			state.time = 0;
			state.wordCount = 0;
		},

		setTime: (state, action) => {
			state.time = action.payload;
		},
	},
});

export const {
	incrementCorrectChar,
	incrementTotalChar,
	setSpeed,
	setAccuracy,
	resetTimeAccuracy,
	setTime,
	incrementWordCount,
} = speedAccuracySlice.actions;
export default speedAccuracySlice.reducer;
