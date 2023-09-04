import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    value: false,
  },
  reducers: {
    getLogged: (state) => {
      state.value = true;
      console.log("Redux state: ", state.value);
    },
    getUnlogged: (state) => {
      state.value = false;
      console.log("Redux state: ", state.value);
    }
  }
});



export const { getLogged, getUnlogged } = loginSlice.actions;

export default loginSlice.reducer;
