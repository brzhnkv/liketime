import { createSlice } from "@reduxjs/toolkit";

export const messages = createSlice({
  name: "messages",
  initialState: {
    statusMessages: [],
    logMessages: [],
    lastStatusMessage: "",
  },
  reducers: {
    getMessages() {},
    setMessages(state, action) {
      const { statusMessages, logMessages } = action.payload;
      return {
        ...state,
        statusMessages,
        logMessages,
        lastStatusMessage: statusMessages[statusMessages.length - 1],
      };
    },

    receiveStatusMessage: (state, action) => {
      ({
        ...state,
        statusMessages: state.statusMessages.push(action.payload),
      });
      state.lastStatusMessage =
        state.statusMessages[state.statusMessages.length - 1];
    },

    receiveLogMessage: (state, action) => {
      ({
        ...state,
        logMessages: state.logMessages.push(action.payload),
      });
    },
    clearMessages() {
      return {
        statusMessages: [],
        logMessages: [],
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getMessages,
  setMessages,
  receiveStatusMessage,
  receiveLogMessage,
  clearMessages,
} = messages.actions;

export default messages.reducer;
