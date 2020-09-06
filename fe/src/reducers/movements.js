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
  list: [
    {
      payer: 2,
      payee: 1,
      amount: 0.4,
    },
    {
      name: 'spesa conad',
      id: 56,
      amount: 21.31,
    },
  ],
};

const movementsSlice = createSlice({
  name: 'movements',
  initialState,
  reducers: {},
});

export default movementsSlice;

export const getMovements = (state) => state.list;
export const getTotAlreadyReturnedTo = (people, movements, personId) =>
  people
    .filter((p) => p !== personId)
    .map((fromPersonId) => ({
      payer: fromPersonId,
      tot: movements.reduce((acc, p) => {
        if (!p.payee || p.payee !== personId || p.payer !== fromPersonId) {
          return acc;
        }
        return acc + p.amount;
      }, 0),
    }));
