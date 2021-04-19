import { createSlice } from "@reduxjs/toolkit";

export const logMessages = createSlice({
  name: "logMessages",
  initialState: {
    messages: [],
  },
  reducers: {
    receiveLogMessage: (state, action) => {
      ({
        ...state,
        messages: state.messages.push(action.payload),
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { receiveLogMessage } = logMessages.actions;

export default logMessages.reducer;
