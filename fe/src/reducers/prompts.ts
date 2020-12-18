import { createSlice } from "@reduxjs/toolkit";

type PromptsState = {
  alert: AlertState;
};

type AlertState = {
  header: string;
};

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

export const getAlertState = (state: PromptsState): AlertState => state.alert;
