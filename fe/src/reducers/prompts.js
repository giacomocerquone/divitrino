import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: {},
};

const promptsSlice = createSlice({
  name: "prompts",
  initialState,
  reducers: {
    openAlert(state, { payload }) {
      return {
        ...state,
        alert: payload,
      };
    },
    closeAlert(state) {
      return {
        ...state,
        alert: {},
      };
    },
  },
});

export default promptsSlice;

export const getAlertState = (state) => state.alert;
