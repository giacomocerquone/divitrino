import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer, createMigrate} from 'redux-persist';
import {combineReducers} from '@reduxjs/toolkit';

import storeMigrations from './store.migrations';
import peopleSlice, * as fromPeople from 'reducers/people';
import purchasesSlice, * as fromPurchases from 'reducers/purchases';
import movementsSlice, * as fromMovements from 'reducers/movements';
import Dinero from 'dinero.js';

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

export const getTotToReturnTo = (state, from, to) => {
  const purchases = getPurchases(state);
  const movements = getMovements(state);

  const purchs = purchases.reduce((acc, p) => {
    const movement = getMovementById(state, p.movementId);
    if (movement.payer === to && p.debtors.includes(from.id)) {
      return acc.add(p.amount.divide(p.debtors.length));
    }
    return acc;
  }, Dinero());

  const movs = movements.reduce((acc, m) => {
    if (m.payer === to.id && m.payee === from.id) {
      return acc.add(m.amount);
    }
    return acc;
  }, Dinero());

  return movs.add(purchs); // TODO check syntax
};

export const newFunc = (state) => {
  const obj = {};
  const people = getPeople(state);

  people.forEach((from) => {
    people
      .filter((p) => from.id !== p.id)
      .forEach((to) => {
        const toReturn = getTotToReturnTo(state, from, to);

        obj[`"from"${from.id}"to"${to.id}`] = toReturn;
      });
  });

  console.log(obj);

  return obj;
};

// this fn returns
// {
//   "fromAtoB": [120, 100]
//   "fromAtoC": 140,
//   "fromBtoA": 100,
//   "fromBtoC": 150,
//   "fromCtoA": 80,
//   "fromCtoB": 60
// }
