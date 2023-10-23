import { createSlice } from '@reduxjs/toolkit';

const resultSlice = createSlice({
  name: 'result',
  initialState: false, 
  reducers: {
    toggleResult: (state) => {
      return !state; 
    },
  },
});

export const { toggleResult } = resultSlice.actions;
export default resultSlice.reducer;