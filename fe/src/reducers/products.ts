import { createSelector, createSlice } from "@reduxjs/toolkit";

type ProductsState = {
  ids: string[];
  byId: {
    [id: string]: Product;
  };
};

type Product = {
  id: string;
  movementId: string;
  name: string;
  amount: number;
  debtors: string[];
};

const initialState: ProductsState = {
  ids: [],
  byId: {},
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts(state, { payload }) {
      const products = payload.reduce(
        (acc: ProductsState["byId"], product: Product) => {
          acc[product.id] = product;
          return acc;
        },
        {}
      );
      return {
        ids: [...payload.map((product: Product) => product.id), ...state.ids],
        byId: {
          ...state.byId,
          ...products,
        },
      };
    },
  },
});

export default productsSlice;

export const getProductById = (state: ProductsState, id: string) =>
  state.byId[id];
export const getProducts = createSelector(
  [(state: ProductsState) => state],
  (state: ProductsState) => state.ids.map((id) => getProductById(state, id))
);
export const getMovementProducts = createSelector(
  [
    (state: ProductsState) => state,
    (_: ProductsState, movementId: string) => movementId,
  ],
  (state: ProductsState, movementId) => {
    return state.ids.reduce((acc: Product[], pId: string) => {
      if (getProductById(state, pId)?.movementId === movementId) {
        return [...acc, getProductById(state, pId)];
      }

      return acc;
    }, []);
  }
);
