import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeAuthValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeAuthValue } = authSlice.actions;

export default authSlice.reducer;
