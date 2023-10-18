import { createSlice } from '@reduxjs/toolkit';

const countdownSlice = createSlice({
  name: 'countdown',
  initialState: 15,
  reducers: {
    setCountdown: (state, action) => {
      return action.payload; // Set the theme to the payload value
    },
  },
});

export const { setCountdown } = countdownSlice.actions;
export default countdownSlice.reducer;
