import { createSlice } from '@reduxjs/toolkit';
import { fetchBoardingHouseData } from './boardingHouseApi';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};
const boardingHouseSlice = createSlice({
  name: 'boardingHouses',
  initialState,
  reducers: {
    setBoardingHouse: (state, action) => {
      state.data = action.payload;
    },
    addBoardingHouse: (state, action) => [...state.data, action.payload],
    removePost(state, action) {
      state.data.splice(action.payload, 2);
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setError: (state, action) => {
      return (state = {
        ...state,
        isLoading: false,
        error: action.payload,
      });
    },

    updateBoardingHouse: (state, action) => {
      const updatedBoardingHouse = action.payload;
      const index = state.findIndex(
        (boardingHouse) => boardingHouse.id === updatedBoardingHouse.id,
      );
      if (index !== -1) {
        state[index] = updatedBoardingHouse;
      }
    },
    deleteBoardingHouse: (state, action) => {
      const boardingHouseId = action.payload;
      return state.filter(
        (boardingHouse) => boardingHouse.id !== boardingHouseId,
      );
    },
  },
});

export const {
  setBoardingHouse,
  addBoardingHouse,
  updateBoardingHouse,
  deleteBoardingHouse,
  reset,
  removePost,
  setLoading,
  setError,
} = boardingHouseSlice.actions;

export const fetchBoardingHouse = () => async (dispatch) => {
  try {
    const data = await fetchBoardingHouseData();

    dispatch(setBoardingHouse(data.items));
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export default boardingHouseSlice.reducer;
