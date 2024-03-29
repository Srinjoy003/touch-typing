"use client";

import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import countdownReducer from "./countdownSlice";
import loadingReducer from "./loadingSlice";
import selectorReducer from "./selectorSlice";
import refreshReducer from "./refreshSlice";
import speedAccuracyReducer from "./speedAccuracySlice";
import resultReducer from "./resultSlice";
import loginReducer from "./loginSlice";
import wordCountSettingReducer from "./wordCountSlice";
import testTypeSReducer from "./testTypeSlice";

export const store = configureStore({
	reducer: {
		theme: themeReducer,
		countdown: countdownReducer,
		loading: loadingReducer,
		selector: selectorReducer,
		refresh: refreshReducer,
		speedAccuracy: speedAccuracyReducer,
		result: resultReducer,
		login: loginReducer,
		wordCountSetting: wordCountSettingReducer,
		testType: testTypeSReducer,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
