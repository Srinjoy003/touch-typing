import { createSlice } from "@reduxjs/toolkit";

const wordCountSettingSlice = createSlice({
	name: "wordCountSetting",
	initialState: 10,
	reducers: {
		setWordCountSetting: (state, action) => {
			return action.payload;
		},
        resetsetWordCountSetting: (state) => {
			return 10;
		},
	},
});

export const { setWordCountSetting, resetsetWordCountSetting } = wordCountSettingSlice.actions;
export default wordCountSettingSlice.reducer;
