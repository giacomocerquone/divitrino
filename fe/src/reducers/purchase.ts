import { createSlice } from "@reduxjs/toolkit";

type Product = {
  id: string;
  name: string;
  amount: string;
};

type PurchaseState = {
  prods: Product[];
};

const initialState = {
  prods: [] as Product[],
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    addProds(state, { payload }: { payload: Product[] }) {
      return { ...state, prods: [...state.prods, ...payload] };
    },
    setProds(state, { payload }) {
      return { ...state, prods: payload };
    },
    delProds(state, { payload }: { payload: { idsToDelete: string[] } }) {
      return {
        ...state,
        prods: state.prods.filter(
          (p: Product) => !payload.idsToDelete.find((id: string) => p.id === id)
        ),
      };
    },
  },
});

export default purchaseSlice;

export const getPurchaseProducts = (state: PurchaseState): Product[] =>
  state.prods;
