import { createSlice } from '@reduxjs/toolkit';
import { fetchCustomerData } from './customerApi';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomer: (state, action) => [...state.data, action.payload],
    addCustomer: (state, action) => [...state.data, action.payload],
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

    updateCustomer: (state, action) => {
      const updatedCustomer = action.payload;
      const index = state.findIndex(
        (customer) => customer.id === updatedCustomer.id,
      );
      if (index !== -1) {
        state[index] = updatedCustomer;
      }
    },
    deleteCustomer: (state, action) => {
      const customerId = action.payload;
      return state.filter((customer) => customer.id !== customerId);
    },
  },
});

export const {
  setCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  reset,
  removePost,
  setLoading,
  setError,
} = customerSlice.actions;

export const fetchCustomer = (accessToken) => async (dispatch) => {
  return accessToken;
  // try {
  //   // dispatch(setLoading());
  //   // const data = await fetchCustomerData(accessToken);
  //   // dispatch(setCustomer(accessToken));
  //   return accessToken;
  //   // console.log(accessToken);
  // } catch (err) {
  //   // dispatch(setError(err.message));
  // }
};

export default customerSlice.reducer;
