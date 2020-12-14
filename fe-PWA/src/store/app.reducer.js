import storage from "redux-persist/lib/storage";
import { persistReducer, createMigrate } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

import storeMigrations from "./store.migrations";
import peopleSlice, * as fromPeople from "reducers/people";
import productsSlice, * as fromProducts from "reducers/products";
import movementsSlice, * as fromMovements from "reducers/movements";
import Dinero from "dinero.js";

const appReducer = combineReducers({
  people: peopleSlice.reducer,
  products: productsSlice.reducer,
  movements: movementsSlice.reducer,
});

const persistConfig = {
  key: "primary",
  storage,
  version: 0,
  migrate: createMigrate(storeMigrations),
  whitelist: [],
};
const persistedReducer = persistReducer(persistConfig, appReducer);

export default persistedReducer;

// People
export const getPeopleObj = (state) => fromPeople.getPeopleObj(state.people);
export const getPeople = (state) => fromPeople.getPeople(state.people);
export const getPersonById = (state, id) =>
  fromPeople.getPersonById(state.people, id);

// Products
export const getProducts = (state) => fromProducts.getProducts(state.products);

// Movements
export const getMovements = (state) =>
  fromMovements.getMovements(state.movements);
export const getMovementById = (state, id) =>
  fromMovements.getMovementById(state.movements, id);
// export const getTotReturnedTo = (state, personId) =>
//   fromMovements.getTotReturnedTo(
//     getPeople(state),
//     getMovements(state),
//     personId,
//   );

// Extra

export const getTotToReturnTo = (state, from, to) => {
  const products = getProducts(state);
  const movements = getMovements(state);

  const purchs = products.reduce((acc, p) => {
    const movement = getMovementById(state, p.movementId);
    if (movement.payer === to.id && p.debtors.includes(from.id)) {
      const pAmount = Dinero({ amount: p.amount });
      return acc.add(pAmount.divide(p.debtors.length));
    }
    return acc;
  }, Dinero());

  const movs = movements.reduce((acc, m) => {
    if (m.payer === to.id && m.payee === from.id) {
      const mAmount = Dinero({ amount: m.amount });
      return acc.add(mAmount);
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

// NEW
// {
//   "A": { B: 120, C: 140 },
//   "B": {A: 100, C: 150}
//   "C": { A: 80, B: 60 }
// }

// OLD
// {
//   "fromAtoB": 120
//   "fromAtoC": 140,
//   "fromBtoA": 100,
//   "fromBtoC": 150,
//   "fromCtoA": 80,
//   "fromCtoB": 60
// }
