/*
{
  ids: [1, 56],
  byId: {
    1: {
      payer: 2,
      payee: 1,
      amount: 0.4,
    },
    56: {
      id: 56,
      description: 'spesa conad',
      payer: 1,
      amount: 21.31,
    },
  },
}
*/

import {createSelector, createSlice} from '@reduxjs/toolkit';

const initialState = {
  ids: [34, 56],
  byId: {
    34: {
      id: 34,
      payer: '0c009f33-1f95-464f-b18e-839d8b764d5d',
      payee: 'dca21677-8f15-4d19-b936-ee19944a9215',
      amount: 0.7,
    },
    56: {
      id: 56,
      description: 'spesa conad',
      payer: 'dca21677-8f15-4d19-b936-ee19944a9215',
      amount: 1.4,
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
        ids: [...state.ids, payload.id],
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

export const getTotReturnedTo = (people, movements, personId) =>
  people
    .filter((p) => p.id !== personId)
    .map((fromPerson) => ({
      payer: fromPerson.id,
      tot: movements.reduce((acc, p) => {
        if (p.payee === personId && p.payer === fromPerson.id) {
          return acc + p.amount;
        }
        return acc;
      }, 0),
    }));
