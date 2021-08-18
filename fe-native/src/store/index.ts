import { configureStore } from "@reduxjs/toolkit";

import userSlice, * as fromUser from "./userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const getToken = (state: RootState) => fromUser.getToken(state.user);
