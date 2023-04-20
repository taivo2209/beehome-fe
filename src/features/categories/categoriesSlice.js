import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {
    setCategories: (state, action) =>[...state, action.payload],
    addCategory: (state, action) => [...state, action.payload],
    updateCategory: (state, action) => {
      const updatedCategory = action.payload;
      const index = state.findIndex((category) => category.id === updatedCategory.id);
      if (index !== -1) {
        state[index] = updatedCategory;
      }
    },
    deleteCategory: (state, action) => {
      const categoryId = action.payload;
      return state.filter((category) => category.id !== categoryId);
    },
  },
});

export const {
  setCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
