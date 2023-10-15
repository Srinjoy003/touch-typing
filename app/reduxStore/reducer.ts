import { CHANGE_THEME } from "./actionTypes";

type themeActionType = {
	type: typeof CHANGE_THEME;
	payload: string; 
};

const initialState = {
	theme: "light",
};

const themeReducer = (state = initialState, action: themeActionType) => {
	if (action.type === CHANGE_THEME) {
		return { ...state, theme: action.payload };
	} else return state;
};
