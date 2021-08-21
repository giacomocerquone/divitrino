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
    editProds(state, { payload }: PayloadAction<Record<string, IProduct>>) {
      for (const idx in payload) {
        state.prods[parseInt(idx, 10)] = payload[idx];
      }
    },
    delProds(state, { payload }: PayloadAction<string[]>) {
      return {
        ...state,
        prods: state.prods.filter(
          (_, idx) => !payload.includes(idx.toString())
        ),
      };
    },
  },
});

export const { addProds, setProds, delProds, editProds } =
  purchaseSlice.actions;

export default purchaseSlice.reducer;

export const getPurchaseProducts = (state: PurchaseState): IProduct[] =>
  state.prods;
