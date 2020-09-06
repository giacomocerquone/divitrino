import {createSlice} from '@reduxjs/toolkit';
import {showMessage} from 'react-native-flash-message';

const initialState = {
  list: [],
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    addPerson: (state, {payload}) => {
      if (state.list.includes(payload)) {
        showMessage({
          message: 'Nome esistente',
          description: 'Già esiste una persona con questo nome',
          type: 'warning',
        });
        return;
      }
      return {
        ...state,
        list: [...state.list, payload],
      };
    },
    delPerson: (state, {payload}) => {
      return {...state, list: state.list.filter((p) => p !== payload)};
    },
  },
  extraReducers: {},
});

export default peopleSlice;

export const getPeople = (state) => state.list;
