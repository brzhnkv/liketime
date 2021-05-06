import { createSlice } from "@reduxjs/toolkit";

export const status = createSlice({
  name: "status",
  initialState: {
    status: false,
  },
  reducers: {
    getStatus() {},
    setStatus(state, action) {
      const { status } = action.payload;
      return {
        ...state,
        status: status,
      };
    },
  },
});

export const { getStatus, setStatus } = status.actions;

export default status.reducer;
