/*
[
  {
    payer: 001,
    payee: 002,
    amount: 10.00
  },
  {
    payer: 001,
    amount: 21.31,
    items: [{
      name: "Patatine",
      amount: 1.20,
      peopleInDebt: [001, 002, 003]
    }]
  }
]
*/

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
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
