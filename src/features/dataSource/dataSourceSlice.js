import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  typeData: 'vi',
};
const dataSourceSlice = createSlice({
  name: 'dataSource',
  initialState,
  reducers: {
    setDataSearch: (state) => {
      state.typeData = 'dataSearch';
    },
    setDataBoardingHouse: (state) => {
      state.typeData = 'dataBoardingHouse';
    },
    setDataStar: (state) => {
      state.typeData = 'dataStar';
    },
  },
});

export const { setDataSearch, setDataBoardingHouse, setDataStar } =
  dataSourceSlice.actions;

export default dataSourceSlice.reducer;
