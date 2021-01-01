import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import promptsSlice from "reducers/prompts";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import appReducer from "./app.reducer";

export const store = configureStore({
  reducer: appReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
        promptsSlice.actions.openAlert.toString(),
      ],
    },
  }),
});

export const persistor = persistStore(store);
