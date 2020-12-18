import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  ids: [],
  byId: {},
};

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    addPerson: (state, { payload }) => {
      return {
        ...state,
        ids: [...state.ids, payload.id],
        byId: {
          ...state.byId,
          [payload.id]: payload,
        },
      };
    },
    delPerson: (state, { payload }) => {
      const { [payload]: omit, ...byId } = state.byId;
      return {
        ...state,
        ids: state.ids.filter((id) => id !== payload),
        byId,
      };
    },
  },
  extraReducers: {},
});

export default peopleSlice;

export const getPeopleObj = (state) => state.byId;
export const getPersonById = (state, id) => state.byId[id];
export const getPeople = createSelector(
  [(state) => state, (state) => state.ids],
  (state, ids) => ids.map((id) => getPersonById(state, id))
);
