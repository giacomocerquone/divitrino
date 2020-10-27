/*
{
  ids: [1, 56],
  byId: {
    1: {
      payer: 2,
      payee: 1,
      amount: Dinero({ amount: 40, currency: 'EUR' }),
    },
    56: {
      id: 56,
      description: 'spesa conad',
      payer: 1,
      amount: Dinero({ amount: 2131, currency: 'EUR' }),
    },
  },
}
*/

import {createSelector, createSlice} from '@reduxjs/toolkit';
import Dinero from 'dinero.js';
Dinero.defaultCurrency = 'EUR';

const initialState = {
  ids: [29, 34, 56],
  byId: {
    29: {
      id: 29,
      description: 'spesa penny',
      payer: '80c52eec-1e48-4bc8-891f-fc0078077842',
      amount: Dinero({amount: 210}),
    },
    34: {
      id: 34,
      payer: '0c009f33-1f95-464f-b18e-839d8b764d5d',
      payee: 'dca21677-8f15-4d19-b936-ee19944a9215',
      amount: Dinero({amount: 70}),
    },
    56: {
      id: 56,
      description: 'spesa conad',
      payer: 'dca21677-8f15-4d19-b936-ee19944a9215',
      amount: Dinero({amount: 140}),
    },
  },
};

const movementsSlice = createSlice({
  name: 'movements',
  initialState,
  reducers: {
    addMovement(state, {payload}) {
      return {
        ...state,
        ids: [payload.id, ...state.ids],
        byId: {
          ...state.byId,
          [payload.id]: payload,
        },
      };
    },
  },
});

export default movementsSlice;

export const getMovementById = (state, id) => state.byId[id];
export const getMovements = createSelector(
  [(state) => state, (state) => state.ids],
  (state, ids) => ids.map((id) => getMovementById(state, id)),
);
