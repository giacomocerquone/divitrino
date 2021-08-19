import { configureStore } from "@reduxjs/toolkit";

import purchaseSlice, * as fromPurchase from "./purchaseSlice";
import userSlice, * as fromUser from "./userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    purchase: purchaseSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const getToken = (state: RootState) => fromUser.getToken(state.user);
export const getGroupId = (state: RootState) => fromUser.getGroupId(state.user);

export const getPurchaseProducts = (state: RootState) =>
  fromPurchase.getPurchaseProducts(state.purchase);
