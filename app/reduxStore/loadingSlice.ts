import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: false, //0 means not mounted
  reducers: {
    setLoading: (state, action) => {
      return action.payload; // Set the theme to the payload value
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
