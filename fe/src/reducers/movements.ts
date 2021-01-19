import { createSelector, createSlice } from "@reduxjs/toolkit";

type Payment = {
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

type Movement = Payment | Purchase;

type MovementsState = {
  ids: string[];
  byId: {
    [id: string]: Payment | Purchase;
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
    addMovements(state, { payload }) {
      const byId = payload.reduce(
        (acc: MovementsState["byId"], m: Movement) => {
          acc[m.id] = m;
          return acc;
        },
        { ...state.byId }
      );
      return {
        ...state,
        ids: [...payload.map((m: Movement) => m.id), ...state.ids],
        byId,
      };
    },
    delMovement(state, { payload }) {
      const { [payload]: omit, ...byId } = state.byId;
      return {
        ...state,
        ids: state.ids.filter((id) => id !== payload),
        byId,
      };
    },
  },
});

export default movementsSlice;

export const getMovementById = (
  state: MovementsState,
  id: string
): Payment | Purchase | undefined => state.byId[id];
export const getMovements = createSelector(
  [(state) => state, (state: MovementsState) => state.ids],
  (state, ids) => ids.map((id) => getMovementById(state, id))
);
