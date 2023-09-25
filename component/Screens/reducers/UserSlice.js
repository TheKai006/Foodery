import {createSlice} from '@reduxjs/toolkit';

export const UserSlice = createSlice({
  name: 'login',
  initialState: {
    Email: null,
    Password: null,
  },
  reducers: {
    EnterEmail: (state, actions) => {
      state.Email = actions.payload;
    },
    EnterPass: (state, actions) => {
      state.Email = actions.payload;
    },
  },
});

export const {EnterEmail, EnterPass} = UserSlice.actions;

export default UserSlice.reducer;
