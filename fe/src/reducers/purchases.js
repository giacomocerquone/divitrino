/*
  [{
    purchaseId: 56,
    name: 'Patatine',
    amount: 1.2,
    payer: 1,
    peopleInDebt: [1, 2, 3],
  }]
*/

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  list: [
    {
      purchaseId: 56,
      name: 'Patatine',
      amount: 1.2,
      payer: 1,
      peopleInDebt: [1, 2, 3],
    },
  ],
};

const purchasesSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {},
});

export default purchasesSlice;

export const getPurchases = (state) => state.list;
export const getTotToBeReturnedTo = (people, purchases, personId) =>
  people
    .filter((p) => p !== personId)
    .map((fromPersonId) => ({
      personInDebt: fromPersonId,
      tot: purchases.reduce((acc, p) => {
        if (p.payer !== personId || !p.peopleInDebt.includes(fromPersonId)) {
          return acc;
        }
        return acc + p.amount;
      }, 0),
    }));
