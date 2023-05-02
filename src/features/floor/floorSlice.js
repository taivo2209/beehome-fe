import { createSlice } from '@reduxjs/toolkit';

const floorSlice = createSlice({
  name: 'floor',
  initialState: [],
  reducers: {
    setFloor: (state, action) => [...state, action.payload],
    addFloor: (state, action) => [...state, action.payload],
    removeFloor(state, action) {
      state.splice(action.payload, 2);
    },

    updateFloor: (state, action) => {
      const updatedFloor = action.payload;
      const index = state.findIndex((floor) => floor.id === updatedFloor.id);
      if (index !== -1) {
        state[index] = updatedFloor;
      }
    },
    deleteFloor: (state, action) => {
      const floorId = action.payload;
      return state.filter((floor) => floor.id !== floorId);
    },
  },
});

export const {
  setFloor,
  addFloor,
  updateFloor,
  deleteFloor,
  reset,
  removeFloor,
} = floorSlice.actions;

export default floorSlice.reducer;
