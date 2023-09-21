import {createSlice} from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchDataRequest: state => {
      state.isLoading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchDataFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {fetchDataRequest, fetchDataSuccess, fetchDataFailure} =
  dataSlice.actions;

export default dataSlice.reducer;
