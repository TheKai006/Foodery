import {createSlice} from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchDataRequest: state => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    fetchDataFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {fetchDataRequest, fetchDataSuccess, fetchDataFailure} =
  dataSlice.actions;

export default dataSlice.reducer;
