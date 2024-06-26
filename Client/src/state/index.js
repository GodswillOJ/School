import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light', // Set default mode
  user: {
    isLoggedIn: !!localStorage.getItem('access_token'), // Retrieve 'access_token'
    userID: localStorage.getItem('userID') || null, // Retrieve 'userID' and default to null if not found
   // other properties...
  },
  // other slices of state...
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setLoginStatus: (state, action) => {
      state.user.isLoggedIn = action.payload; // Update login status
    },
    // other actions can be added here
  }
});

export const { setMode, setLoginStatus } = globalSlice.actions;

export default globalSlice.reducer;
