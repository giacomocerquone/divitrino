import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "../interfaces";

export interface UserState {
  token: string;
  user: Partial<IUser>;
}

const initialState: UserState = {
  token: "",
  user: {},
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string; user: IUser }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout(state) {
      state.token = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = counterSlice.actions;

export default counterSlice.reducer;

export const getToken = (state: UserState) => state.token;
export const getGroupId = (state: UserState) =>
  state.user?.groups?.[0]?.id || "";
