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
      amount: 1.4,
      debtors: [
        'dca21677-8f15-4d19-b936-ee19944a9215',
        '0a66ff4b-3765-41b7-ae08-55a7f180b181',
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
export const getPurchases = (state) =>
  state.ids.map((id) => getPurchaseById(state, id));
