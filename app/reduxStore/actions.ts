import { CHANGE_THEME } from "./actionTypes";

export const changeTheme = (theme: string) => ({
    type: CHANGE_THEME,
    payload: theme,
  });

