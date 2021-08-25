import storage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import purchaseSlice, * as fromPurchase from "./purchaseSlice";
import userSlice, * as fromUser from "./userSlice";

const rootReducer = combineReducers({
  user: userSlice,
  purchase: purchaseSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const getToken = (state: RootState) => fromUser.getToken(state.user);
export const getUser = (state: RootState) => fromUser.getUser(state.user);
export const getActiveGroupId = (state: RootState) =>
  fromUser.getActiveGroupId(state.user);
export const getActiveGroupUsers = (state: RootState) =>
  fromUser.getActiveGroupUsers(state.user);
export const getGroups = (state: RootState) => fromUser.getGroups(state.user);

export const getPurchaseProducts = (state: RootState) =>
  fromPurchase.getPurchaseProducts(state.purchase);
