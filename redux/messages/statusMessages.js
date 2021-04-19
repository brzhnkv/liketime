import { createSlice } from "@reduxjs/toolkit";

export const statusMessages = createSlice({
  name: "statusMessages",
  initialState: {
    messages: [],
    lastMessage: "",
  },
  reducers: {
    receiveStatusMessage: (state, action) => {
      ({
        ...state,
        messages: state.messages.push(action.payload),
      });
      state.lastMessage = state.messages[state.messages.length - 1];
    },
  },
});

// Action creators are generated for each case reducer function
export const { receiveStatusMessage } = statusMessages.actions;

export default statusMessages.reducer;
