import { createSlice } from '@reduxjs/toolkit';
import { fetchDataSearchData } from './dataSearchApi';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};
const dataSearchSlice = createSlice({
  name: 'dataSearch',
  initialState,
  reducers: {
    setDataSearch: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setDataSearch } = dataSearchSlice.actions;

export const fetchDataSearch = (dataFilter) => async (dispatch) => {
  try {
    const data = await fetchDataSearchData(dataFilter);

    dispatch(setDataSearch(data.items));
  } catch (err) {
    // dispatch(setError(err.message));
  }
};

export default dataSearchSlice.reducer;
