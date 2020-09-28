/*
 {
  ids: [1],
  byId: {
    1: {
      movementId: 56,
      name: 'Patatine',
      amount: Dinero({amount: 120}),
      debtors: [1, 2, 3],
    },
  },
}
*/

import {createSelector, createSlice} from '@reduxjs/toolkit';
import Dinero from 'dinero.js';
Dinero.defaultCurrency = 'EUR';

const initialState = {
  ids: [1],
  byId: {
    1: {
      movementId: 56,
      name: 'Patatine',
      amount: Dinero({amount: 140}),
      debtors: [
        'dca21677-8f15-4d19-b936-ee19944a9215',
        '0c009f33-1f95-464f-b18e-839d8b764d5d',
      ],
    },
  },
};

const purchasesSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {},
});

export default purchasesSlice;

export const getPurchaseById = (state, id) => state.byId[id];
export const getPurchases = createSelector(
  [(state) => state, (state) => state.ids],
  (state, ids) => ids.map((id) => getPurchaseById(state, id)),
);
