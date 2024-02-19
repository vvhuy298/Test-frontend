import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) ?? null,
  },
  reducers: {
    logged: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem(
        'ACCESS_TOKEN',
        JSON.stringify(action.payload.authorisation.token),
      );
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('ACCESS_TOKEN');
    },
  },
});

export const { logged, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
