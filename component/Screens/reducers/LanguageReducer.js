import {createSlice} from '@reduxjs/toolkit';

export const LanguageReducer = createSlice({
  name: 'language',
  initialState: {
    data: 'English',
  },
  reducers: {
    changeLanguage: (state, actions) => {
      state.data = actions.payload;
    },
  },
});

export const {changeLanguage} = LanguageReducer.actions;

export default LanguageReducer.reducer;
