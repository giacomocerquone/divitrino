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
  whitelist: ['people'],
};
const persistedReducer = persistReducer(persistConfig, appReducer);

export default persistedReducer;

// People
export const getPeople = (state) => fromPeople.getPeople(state.people);
export const getPersonById = (state, id) =>
  fromPeople.getPersonById(state.people, id);

// Purchases
export const getPurchases = (state) =>
  fromPurchases.getPurchases(state.purchases);

// Movements
export const getMovements = (state) =>
  fromMovements.getMovements(state.movements);
export const getMovementById = (state, id) =>
  fromMovements.getMovementById(state.movements, id);
export const getTotReturnedTo = (state, personId) =>
  fromMovements.getTotReturnedTo(
    getPeople(state),
    getMovements(state),
    personId,
  );

// Extra

export const getTotToReturnTo = (state, personId) => {
  const people = getPeople(state);
  const purchases = getPurchases(state);

  return people
    .filter((p) => p.id !== personId)
    .map((fromPerson) => ({
      debtor: fromPerson.id,
      tot: purchases.reduce((acc, p) => {
        const movement = getMovementById(state, p.movementId);
        if (movement.payer === personId && p.debtors.includes(fromPerson.id)) {
          return acc + p.amount / p.debtors.length;
        }
        return acc;
      }, 0),
    }));
};

export const getPersonBalance = (state, personId) => {
  const toBeReturned = getTotToReturnTo(state, personId);
  const alreadyReturned = getTotReturnedTo(state, personId);

  return {toBeReturned, alreadyReturned};
};
