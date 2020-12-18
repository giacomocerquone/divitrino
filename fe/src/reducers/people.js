import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  ids: [
    "0c009f33-1f95-464f-b18e-839d8b764d5d",
    "dca21677-8f15-4d19-b936-ee19944a9215",
    "80c52eec-1e48-4bc8-891f-fc0078077842",
  ],
  byId: {
    "dca21677-8f15-4d19-b936-ee19944a9215": {
      id: "dca21677-8f15-4d19-b936-ee19944a9215",
      name: "Giacomo",
    },
    "0c009f33-1f95-464f-b18e-839d8b764d5d": {
      id: "0c009f33-1f95-464f-b18e-839d8b764d5d",
      name: "Danica",
    },
    "80c52eec-1e48-4bc8-891f-fc0078077842": {
      id: "80c52eec-1e48-4bc8-891f-fc0078077842",
      name: "Gianluca",
    },
  },
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
