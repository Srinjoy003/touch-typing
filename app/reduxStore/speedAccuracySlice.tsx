// themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const speedAccuracySlice = createSlice({
	name: "speedAccuracy",
	initialState: { totalChar: 0, correctChar: 0, speed: 0, accuracy: 0 },
	reducers: {
		incrementTotalChar: (state) => {
			state.totalChar += 1;
		},
		incrementCorrectChar: (state) => {
			state.correctChar += 1;
		},
        setSpeed: (state, action) => {
			state.speed = action.payload;
		},

		setAccuracy: (state, action) => {
			state.speed = action.payload;
		},
        resetTimeAccuracy: (state) => {
            state.totalChar = 0;
            state.correctChar = 0;
            state.speed = 0;
			state.accuracy = 0
        }

	},
});

export const { incrementCorrectChar, incrementTotalChar, setTime, resetTimeAccuracy } = speedAccuracySlice.actions;
export default speedAccuracySlice.reducer;
