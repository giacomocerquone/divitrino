import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer, createMigrate} from 'redux-persist';
import {combineReducers} from '@reduxjs/toolkit';

import storeMigrations from './store.migrations';

const appReducer = combineReducers({});

const persistConfig = {
  key: 'primary',
  storage: AsyncStorage,
  version: 0,
  migrate: createMigrate(storeMigrations),
  whitelist: [],
};
const persistedReducer = persistReducer(persistConfig, appReducer);

export default persistedReducer;
