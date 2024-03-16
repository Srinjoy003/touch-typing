import { createSlice } from '@reduxjs/toolkit';

const testTypeSlice = createSlice({
  name: 'testType',
  initialState: "time",
  reducers: {
    setTestType: (state, action) => {
        if (action.payload === "time" || action.payload === "word")
            return action.payload;
    },
  },
});

export const { setTestType } = testTypeSlice.actions;
export default testTypeSlice.reducer;
