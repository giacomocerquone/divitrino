import storage from "redux-persist/lib/storage";
import { persistReducer, createMigrate } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import Dinero from "dinero.js";

import storeMigrations from "./store.migrations";
import peopleSlice, * as fromPeople from "reducers/people";
import productsSlice, * as fromProducts from "reducers/products";
import movementsSlice, * as fromMovements from "reducers/movements";
import promptsSlice, * as fromPrompts from "reducers/prompts";

const appReducer = combineReducers({
  people: peopleSlice.reducer,
  products: productsSlice.reducer,
  movements: movementsSlice.reducer,
  prompts: promptsSlice.reducer,
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

// Prompts
export const getAlertState = (state) =>
  fromPrompts.getAlertState(state.prompts);

// Extra
export const getTotToReturnTo = (state, from, to) => {
  const products = getProducts(state);
  const movements = getMovements(state);

  const prods = products.reduce((acc, p) => {
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

  return movs.add(prods); // TODO check syntax
};

export const getDebts = (state, normalize = true) => {
  const obj = {};
  const people = getPeople(state);

  people.forEach((from) => {
    obj[from.id] = {};
    people
      .filter((p) => from.id !== p.id)
      .forEach((to) => {
        const toReturn = getTotToReturnTo(state, from, to);
        const toReturnReverse = obj[to.id]?.[from.id];

        if (normalize && !!toReturnReverse) {
          if (toReturn.lessThanOrEqual(toReturnReverse)) {
            obj[to.id][from.id] = toReturnReverse.subtract(toReturn);
            obj[from.id][to.id] = Dinero(); // set to 0
          } else {
            obj[to.id][from.id] = Dinero(); // set to 0
            obj[from.id][to.id] = toReturn.subtract(toReturnReverse);
          }
        } else {
          obj[from.id][to.id] = toReturn;
        }
      });
  });

  return obj;
};

// TODO check if comment is up to date
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
