import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    value: false,
  },
  reducers: {
    getLogged: (state) => {
      state.value = true;
    },
    getUnlogged: (state) => {
      state.value = false;
    }
  }
});

export const { getLogged, getUnlogged } = loginSlice.actions;

export default loginSlice.reducer;
