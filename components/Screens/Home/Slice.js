import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const ApiCall = createSlice({
  name: 'Call',
  initialState: {
    isLoading: false,
    data: [],
    error: null,
    isDarkMode: false,
  },
  reducers: {
    fetching: state => {
      (state.isLoading = true), (state.error = null);
    },
    success: (state, action) => {
      (state.data = action.payload), (state.isLoading = false);
    },
    failed: (state, action) => {
      (state.error = action.payload), (state.isLoading = false);
    },
    toggleTheme: state => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const {fetching, success, failed, toggleTheme} = ApiCall.actions;

export const getData = () => async dispatch => {
  dispatch(fetching());
  try {
    const apiData = await axios.get('https://fakestoreapi.com/products');
    dispatch(success(apiData?.data));
  } catch (error) {
    dispatch(failed(error.message));
  }
};

export const passingState = state => state.Call;

export default ApiCall.reducer;
