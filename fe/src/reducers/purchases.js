/*
 {
  ids: [1],
  byId: {
    1: {
      movementId: 56,
      name: 'Patatine',
      amount: 1.2,
      debtors: [1, 2, 3],
    },
  },
}
*/

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  ids: [1],
  byId: {
    1: {
      movementId: 56,
      name: 'Patatine',
      amount: 1.2,
      debtors: [1, 2, 3],
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
export const getPurchases = (state) =>
  state.ids.map((id) => getPurchaseById(state, id));
export const getTotToReturnTo = (people, purchases, personId) =>
  people
    .filter((p) => p.id !== personId)
    .map((fromPerson) => ({
      debtor: fromPerson.id,
      tot: purchases.reduce((acc, p) => {
        if (p.payer !== personId || !p.debtors.includes(fromPerson.id)) {
          return acc;
        }
        return acc + p.amount;
      }, 0),
    }));
