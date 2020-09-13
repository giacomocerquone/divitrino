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

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  ids: [34, 56],
  byId: {
    34: {
      payer: '0a66ff4b-3765-41b7-ae08-55a7f180b181',
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
  reducers: {},
});

export default movementsSlice;

export const getMovementById = (state, id) => state.byId[id];
export const getMovements = (state) =>
  state.ids.map((id) => getMovementById(state, id));
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
