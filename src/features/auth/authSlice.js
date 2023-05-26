import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  package: '',
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setPackage: (state, action) => {
      state.package = action.payload;
    },
    clearAccessToken: (state) => {
      state.accessToken = initialState;
    }, 
  },
});
export const { setAccessToken, clearAccessToken, setPackage } = authSlice.actions;
export default authSlice.reducer;
