import { createSlice } from '@reduxjs/toolkit';
import { fetchCommentData } from './commentApi';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComment: (state, action) => [...state.data, action.payload],
    addComment: (state, action) => [...state.data, action.payload],
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

    updateComment: (state, action) => {
      const updatedComment = action.payload;
      const index = state.findIndex(
        (comment) => comment.id === updatedComment.id,
      );
      if (index !== -1) {
        state[index] = updatedComment;
      }
    },
    deleteComment: (state, action) => {
      const commentId = action.payload;
      return state.filter((comment) => comment.id !== commentId);
    },
  },
});

export const {
  setComment,
  addComment,
  updateComment,
  deleteComment,
  reset,
  removePost,
  setLoading,
  setError,
} = commentSlice.actions;

export const fetchComment = (boardingHouseId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const data = await fetchCommentData(boardingHouseId);
    dispatch(setData(data));
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export default commentSlice.reducer;
