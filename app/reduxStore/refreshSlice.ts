import { createSlice } from '@reduxjs/toolkit';

const refreshSlice = createSlice({
  name: 'refresh',
  initialState: 0,
  reducers: {
    alterRefresh: (state) => {
      return (state + 1) % 2; 
    },
  },
});

export const { alterRefresh } = refreshSlice.actions;
export default refreshSlice.reducer;
