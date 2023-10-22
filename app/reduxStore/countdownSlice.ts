import { createSlice } from '@reduxjs/toolkit';

const countdownSlice = createSlice({
  name: 'countdown',
  initialState: 15,
  reducers: {
    setCountdown: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCountdown } = countdownSlice.actions;
export default countdownSlice.reducer;
