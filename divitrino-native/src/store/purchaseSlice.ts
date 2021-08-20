import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IProduct } from "../interfaces";

export interface PurchaseState {
  prods: IProduct[];
}

const initialState: PurchaseState = {
  prods: [],
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    addProds(state, { payload }: PayloadAction<IProduct[]>) {
      state.prods.push(...payload);
    },
    setProds(state, { payload }: PayloadAction<IProduct[]>) {
      state.prods = payload;
    },
    delProds(state, { payload }: PayloadAction<number[]>) {
      return {
        ...state,
        prods: state.prods.filter((_, idx) => !payload.includes(idx)),
      };
    },
  },
});

export const { addProds, setProds, delProds } = purchaseSlice.actions;

export default purchaseSlice.reducer;

export const getPurchaseProducts = (state: PurchaseState): IProduct[] =>
  state.prods;
