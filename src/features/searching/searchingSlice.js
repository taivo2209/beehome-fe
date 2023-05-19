import { createSlice } from '@reduxjs/toolkit';
import { fetchSearchingData } from './searchingApi';

const initialState = {
  data: {
    searchText: '',
    province: {},
    ward: {},
    district: {},
    startPrice: {},
    endPrice: {},
    provinceData: {},
    wardData: {},
    districtData: {},
  },
  isLoading: false,
  error: null,
};
const searchingSlice = createSlice({
  name: 'searchings',
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.data = { ...state.data, searchText: action.payload };
    },
    resetData: (state) => {
      state.data = initialState.data;
    },

    setProvince: (state, action) => {
      state.data = { ...state.data, province: action.payload };
    },
    setWard: (state, action) => {
      state.data = { ...state.data, ward: action.payload };
    },
    setDistrict: (state, action) => {
      state.data = { ...state.data, district: action.payload };
    },
    resetWard: (state) => {
      state.data.ward = initialState.data.ward;
    },
    resetDistrict: (state) => {
      state.data.district = initialState.data.district;
    },
    addPrice: (state, action) => {
      state.data.startPrice = action.payload.min;
      state.data.endPrice = action.payload.max;
    },
    setProvinceData: (state, action) => {
      state.data = { ...state.data, provinceData: action.payload };
    },
    setWardData: (state, action) => {
      state.data = { ...state.data, wardData: action.payload };
    },
    setDistrictData: (state, action) => {
      state.data = { ...state.data, districtData: action.payload };
    },
  },
});

export const {
  setSearchText,
  setProvince,
  setWard,
  setDistrict,
  addPrice,
  resetWard,
  resetDistrict,
  resetData,
  setProvinceData,
  setWardData,
  setDistrictData,
} = searchingSlice.actions;

// export const fetchSearching = () => async (dispatch) => {
//   try {
//     const data = await fetchSearchingData();

//     dispatch(setSearchText(data.items));
//   } catch (err) {
//     dispatch(setError(err.message));
//   }
// };

export default searchingSlice.reducer;
