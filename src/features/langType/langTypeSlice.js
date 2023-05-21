import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  typeData: 'vi',
};
const langTypeSlice = createSlice({
  name: 'langType',
  initialState,
  reducers: {
    setVI: (state, action) => {
      state.typeData = action.payload;
    },
    setEN: (state, action) => {
      state.typeData = action.payload;
    },
  },
});

export const { setVI, setEN } = langTypeSlice.actions;

export default langTypeSlice.reducer;
