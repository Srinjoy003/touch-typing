import { createSlice } from "@reduxjs/toolkit";

const selectorSlice = createSlice({
  name: "selector",
  initialState: { punc: false, num: false, caps: false },
  reducers: {
    togglePunc: (state) => {
      state.punc = !state.punc; // Invert the boolean value of punc
    },
    toggleCaps: (state) => {
      state.caps = !state.caps; // Invert the boolean value of caps
    },
    toggleNum: (state) => {
      state.num = !state.num; // Invert the boolean value of num
    },
  },
});

export const { togglePunc, toggleCaps, toggleNum } = selectorSlice.actions;
export default selectorSlice.reducer;
