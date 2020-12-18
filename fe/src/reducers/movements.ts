import { createSelector, createSlice } from "@reduxjs/toolkit";

type Movement = {
  id: string;
  payer: string;
  payee: string;
  amount: number;
};

type Purchase = {
  id: string;
  payer: string;
  amount: number;
  description?: string;
};

type MovementsState = {
  ids: string[];
  byId: {
    [id: string]: Movement | Purchase;
  };
};

const initialState: MovementsState = {
  ids: [],
  byId: {},
};

const movementsSlice = createSlice({
  name: "movements",
  initialState,
  reducers: {
    addMovement(state, { payload }) {
      return {
        ...state,
        ids: [payload.id, ...state.ids],
        byId: {
          ...state.byId,
          [payload.id]: payload,
        },
      };
    },
  },
});

export default movementsSlice;

export const getMovementById = (
  state: MovementsState,
  id: string
): Movement | Purchase | undefined => state.byId[id];
export const getMovements = createSelector(
  [(state) => state, (state: MovementsState) => state.ids],
  (state, ids) => ids.map((id) => getMovementById(state, id))
);
