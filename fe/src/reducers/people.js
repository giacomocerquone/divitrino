import {createSelector, createSlice} from '@reduxjs/toolkit';
import {showMessage} from 'react-native-flash-message';

const initialState = {
  ids: [
    '0c009f33-1f95-464f-b18e-839d8b764d5d',
    'dca21677-8f15-4d19-b936-ee19944a9215',
  ],
  byId: {
    'dca21677-8f15-4d19-b936-ee19944a9215': {
      id: 'dca21677-8f15-4d19-b936-ee19944a9215',
      name: 'Giacomo',
    },
    '0c009f33-1f95-464f-b18e-839d8b764d5d': {
      id: '0c009f33-1f95-464f-b18e-839d8b764d5d',
      name: 'Danica',
    },
  },
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    addPerson: (state, {payload}) => {
      if (state.ids.includes(payload.id)) {
        showMessage({
          message: 'Nome esistente',
          description: 'Già esiste una persona con questo nome',
          type: 'warning',
        });
        return;
      }
      return {
        ...state,
        ids: [...state.ids, payload.id],
        byId: {
          ...state.byId,
          [payload.id]: payload,
        },
      };
    },
    delPerson: (state, {payload}) => {
      const {[payload]: omit, ...byId} = state.byId;
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

export const getPersonById = (state, id) => state.byId[id];
export const getPeople = createSelector(
  [(state) => state, (state) => state.ids],
  (state, ids) => ids.map((id) => getPersonById(state, id)),
);
