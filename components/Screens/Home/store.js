import {configureStore} from '@reduxjs/toolkit';
import ApiCall from './Slice';

const store = configureStore({
  reducer: {
    Call: ApiCall,
  },
});

export default store;
