import {createSlice} from '@reduxjs/toolkit';
import {showMessage} from 'react-native-flash-message';

const initialState = {
  ids: [],
  byId: {},
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
export const getPeople = (state) =>
  state.ids.map((id) => getPersonById(state, id));
