import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
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

export const getMovementById = (state, id) => state.byId[id];
export const getMovements = createSelector(
  [(state) => state, (state) => state.ids],
  (state, ids) => ids.map((id) => getMovementById(state, id))
);
