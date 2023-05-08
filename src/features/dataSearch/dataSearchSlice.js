import { createSlice } from '@reduxjs/toolkit';
import { fetchDataSearchData } from './dataSearchApi';

const initialState = {
  data: [],
  dataPaging: [],
  isLoading: false,
  error: null,
};
const dataSearchSlice = createSlice({
  name: 'dataSearch',
  initialState,
  reducers: {
    setDataSearch: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    setDataPaging: (state, action) => {
      state.dataPaging = action.payload;
      state.isLoading = false;
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export const { setDataSearch, setLoading, setDataPaging } =
  dataSearchSlice.actions;

export const fetchDataSearch = (dataFilter) => async (dispatch) => {
  try {
    dispatch(setLoading());

    const data = await fetchDataSearchData(dataFilter);
    dispatch(setDataPaging(data.items));
    dispatch(setDataSearch(data.items));
  } catch (err) {
    // dispatch(setError(err.message));
  }
};

export default dataSearchSlice.reducer;
