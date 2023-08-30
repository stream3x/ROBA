import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice.js';

const store = configureStore({
  reducer: {
    login: loginReducer
    // altri slice
  }
})

export default store;
