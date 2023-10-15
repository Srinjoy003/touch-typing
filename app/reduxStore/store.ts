'use client'

import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import countdownReducer from "./countdownSlice";


export const store = configureStore({
	reducer: {
        theme: themeReducer,
        countdown: countdownReducer,

    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;


