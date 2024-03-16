import { createSlice } from "@reduxjs/toolkit";
import { setTime } from "./speedAccuracySlice";

const refreshSlice = createSlice({
	name: "refresh",
	initialState: 0,
	reducers: {
		alterRefresh: (state) => {
			setTime(0);
			return (state + 1) % 2;
		},
	},
});

export const { alterRefresh } = refreshSlice.actions;
export default refreshSlice.reducer;
