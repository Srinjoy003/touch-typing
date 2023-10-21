// themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: 'dolphin',
  reducers: {
    setTheme: (state, action) => {
      return action.payload; // Set the theme to the payload value
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
