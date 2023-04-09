import { createSlice } from '@reduxjs/toolkit';
import User from '@src/types/user';

interface AuthState {
  isLoggedIn: boolean | undefined;
  user: User | undefined;
}

const initialState: AuthState = {
  isLoggedIn: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logUserIn(state, action) {
      const res = action.payload;
      state.user = res.data;
      state.isLoggedIn = true;
    },
    failToLogin(state) {
      state.isLoggedIn = false;
      state.user = undefined;
    },
  },
});

const authReducer = authSlice.reducer;

export default authReducer;
export const { logUserIn, failToLogin } = authSlice.actions;
