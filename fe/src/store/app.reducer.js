import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer, createMigrate} from 'redux-persist';
import {combineReducers} from '@reduxjs/toolkit';

import storeMigrations from './store.migrations';
import peopleSlice, * as fromPeople from 'reducers/people';
import purchasesSlice, * as fromPurchases from 'reducers/purchases';
import movementsSlice, * as fromMovements from 'reducers/movements';

const appReducer = combineReducers({
  people: peopleSlice.reducer,
  purchases: purchasesSlice.reducer,
  movements: movementsSlice.reducer,
});

const persistConfig = {
  key: 'primary',
  storage: AsyncStorage,
  version: 0,
  migrate: createMigrate(storeMigrations),
  whitelist: [],
};
const persistedReducer = persistReducer(persistConfig, appReducer);

export default persistedReducer;

// People
export const getPeople = (state) => fromPeople.getPeople(state.people);

// Purchases
export const getPurchases = (state) =>
  fromPurchases.getPurchases(state.purchases);
export const getTotToReturnTo = (state, personId) =>
  fromPurchases.getTotToReturnTo(
    getPeople(state),
    getPurchases(state),
    personId,
  );

// Movements
export const getMovements = (state) =>
  fromMovements.getMovements(state.movements);
export const getTotReturnedTo = (state, personId) =>
  fromMovements.getTotReturnedTo(
    getPeople(state),
    getMovements(state),
    personId,
  );

// Extra

export const getPersonBalance = (state, personId) => {
  const toBeReturned = getTotToReturnTo(state, personId);
  const alreadyReturned = getTotReturnedTo(state, personId);

  console.log(toBeReturned, alreadyReturned)

  return null;
};
