import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer, createMigrate} from 'redux-persist';
import {combineReducers} from '@reduxjs/toolkit';

import storeMigrations from './store.migrations';
import peopleSlice, * as fromPeople from 'reducers/people';

const appReducer = combineReducers({
  people: peopleSlice.reducer,
});

const persistConfig = {
  key: 'primary',
  storage: AsyncStorage,
  version: 0,
  migrate: createMigrate(storeMigrations),
  whitelist: ['people'],
};
const persistedReducer = persistReducer(persistConfig, appReducer);

export default persistedReducer;

export const getPeople = (state) => fromPeople.getPeople(state.people);
