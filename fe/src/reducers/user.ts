import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  token: string;
};

const initialState: UserState = {
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, { payload }) {
      return {
        ...state,
        token: payload.token,
      };
    },
    logout() {
      return initialState;
    },
  },
});

export default userSlice;

export const getToken = (state: UserState) => state.token;
