'use client'

import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import countdownReducer from "./countdownSlice";
import loadingReducer from "./loadingSlice";


export const store = configureStore({
	reducer: {
        theme: themeReducer,
        countdown: countdownReducer,
        loading: loadingReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;


