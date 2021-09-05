import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IGroup, IUser } from "../interfaces";

export interface UserState {
  token: string;
  user: Partial<IUser>;
  activeGroupId: string;
  groups: IGroup[];
}

const initialState: UserState = {
  token: "",
  user: {},
  activeGroupId: "",
  groups: [],
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
      const { groups, ...user } = action.payload.user;
      state.token = action.payload.token;
      state.user = user;
      state.groups = groups;
      state.activeGroupId = action.payload.user?.groups?.[0]?.id;
    },
    logout() {
      return initialState;
    },
    groupsReceived(state, action: PayloadAction<IGroup[]>) {
      state.groups = action.payload;
      if (action.payload?.[0]) {
        state.activeGroupId = action.payload?.[0].id;
      }
    },
    setActiveGroupId(state, action: PayloadAction<IGroup["id"]>) {
      state.activeGroupId = action.payload;
    },
  },
});

export const { login, logout, groupsReceived, setActiveGroupId } =
  userSlice.actions;

export default userSlice.reducer;

export const getToken = (state: UserState) => state.token;
export const getUser = (state: UserState) => state.user;
export const getActiveGroupId = (state: UserState) => state.activeGroupId;
export const getGroups = (state: UserState) => state.groups;
export const getActiveGroupUsers = (state: UserState) =>
  state.groups?.find((group) => group.id === state.activeGroupId)?.users;
