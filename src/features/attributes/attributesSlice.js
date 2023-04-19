import { createSlice } from '@reduxjs/toolkit';

const attributesSlice = createSlice({
  name: 'attributes',
  initialState: [],
  reducers: {
    setAttributes: (state, action) => [...state, action.payload],
    addAttribute: (state, action) => [...state, action.payload],
    updateAttribute: (state, action) => {
      const updatedAttribute = action.payload;
      const index = state.findIndex(
        (category) => category.id === updatedAttribute.id,
      );
      if (index !== -1) {
        state[index] = updatedAttribute;
      }
    },
    deleteAttribute: (state, action) => {
      const categoryId = action.payload;
      return state.filter((category) => category.id !== categoryId);
    },
  },
});

export const { setAttributes, addAttribute, updateAttribute, deleteAttribute } =
  attributesSlice.actions;

export default attributesSlice.reducer;
