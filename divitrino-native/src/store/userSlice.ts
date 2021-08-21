import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IGroup, IUser } from "../interfaces";

export interface UserState {
  token: string;
  user: Partial<IUser>;
  activeGroupId: string;
}

const initialState: UserState = {
  token: "",
  user: {},
  activeGroupId: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{
        token: string;
        user: IUser & { groups: IGroup[] };
      }>
    ) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.activeGroupId = action.payload.user?.groups?.[0]?.id;
    },
    logout(state) {
      state.token = "";
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

export const getToken = (state: UserState) => state.token;
export const getActiveGroupId = (state: UserState) => state.activeGroupId;
// export const getActiveGroupUsersMap = (state: UserState) =>
//   state.groups[state.activeGroupId]?.users;
export const getActiveGroupUsers = (state: UserState) =>
  state.user.groups?.find((group) => group.id === state.activeGroupId)?.users;
