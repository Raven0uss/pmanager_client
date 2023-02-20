import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../hooks/useToken";

const initialState = {
  value: false,
  token: getToken()
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
