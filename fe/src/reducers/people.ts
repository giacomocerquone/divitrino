import { createSelector, createSlice } from "@reduxjs/toolkit";

type Person = {
  id: string;
  name: string;
};

type PeopleState = {
  ids: string[];
  byId: {
    [id: string]: Person;
  };
};

const initialState: PeopleState = {
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

export const getPeopleObj = (state: PeopleState): PeopleState["byId"] =>
  state.byId;
export const getPersonById = (state: PeopleState, id: string) => state.byId[id];
export const getPeople = createSelector(
  [(state) => state, (state: PeopleState) => state.ids],
  (state, ids) => ids.map((id) => getPersonById(state, id))
);
