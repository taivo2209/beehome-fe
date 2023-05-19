import { createSlice } from '@reduxjs/toolkit';
import { fetchBoardingHouseStarData } from './boardingHouseStarApi';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};
const boardingHouseStarSlice = createSlice({
  name: 'boardingHouseStars',
  initialState,
  reducers: {
    setBoardingHouseStar: (state, action) => {
      state.data = action.payload;
    },
    addBoardingHouseStar: (state, action) => [...state.data, action.payload],
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

    updateBoardingHouseStar: (state, action) => {
      const updatedBoardingHouseStar = action.payload;
      const index = state.findIndex(
        (boardingHouseStar) =>
          boardingHouseStar.id === updatedBoardingHouseStar.id,
      );
      if (index !== -1) {
        state[index] = updatedBoardingHouseStar;
      }
    },
    deleteBoardingHouseStar: (state, action) => {
      const boardingHouseStarId = action.payload;
      return state.filter(
        (boardingHouseStar) => boardingHouseStar.id !== boardingHouseStarId,
      );
    },
  },
});

export const {
  setBoardingHouseStar,
  addBoardingHouseStar,
  updateBoardingHouseStar,
  deleteBoardingHouseStar,
  reset,
  removePost,
  setLoading,
  setError,
} = boardingHouseStarSlice.actions;

export const fetchBoardingHouseStar = () => async (dispatch) => {
  try {
    const data = await fetchBoardingHouseStarData();

    dispatch(setBoardingHouseStar(data.items));
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export default boardingHouseStarSlice.reducer;
