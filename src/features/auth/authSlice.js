import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  endDate: "",
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    clearAccessToken: (state) => {
      state.accessToken = initialState;
    },
  },
});
export const { setAccessToken, setEndDate, clearAccessToken } =
  authSlice.actions;
export default authSlice.reducer;
