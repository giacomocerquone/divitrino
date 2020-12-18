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
};

type MovementState = {
  ids: string[];
  byId: {
    [id: string]: Movement | Purchase;
  };
};

const initialState: MovementState = {
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
  state: MovementState,
  id: string
): Movement | Purchase | undefined => state.byId[id];
export const getMovements = createSelector(
  [(state) => state, (state: MovementState) => state.ids],
  (state, ids) => ids.map((id) => getMovementById(state, id))
);
