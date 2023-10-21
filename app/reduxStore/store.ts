'use client'

import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import countdownReducer from "./countdownSlice";
import loadingReducer from "./loadingSlice";
import selectorReducer from "./selectorSlice";
import refreshReducer from "./refreshSlice";





export const store = configureStore({
	reducer: {
        theme: themeReducer,
        countdown: countdownReducer,
        loading: loadingReducer,
        selector: selectorReducer,
        refresh: refreshReducer,

    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;


