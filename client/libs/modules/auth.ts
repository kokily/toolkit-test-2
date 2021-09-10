import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  user: string | null;
  loginLoading: boolean;
  loginError: any;
  logoutLoading: boolean;
  logoutError: any;
};

export type LoginPayload = {
  password: string;
};

const initialState: AuthState = {
  user: null,
  loginLoading: false,
  loginError: null,
  logoutLoading: false,
  logoutError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state: AuthState, action: PayloadAction<LoginPayload>) {
      state.loginLoading = true;
      state.loginError = null;
    },
    loginSuccess(state: AuthState, action: PayloadAction<string>) {
      state.loginLoading = false;
      state.user = action.payload;
    },
    loginFailure(state: AuthState, action: PayloadAction<{ error: any }>) {
      state.loginLoading = false;
      state.loginError = action.payload;
    },
    logoutRequest(state: AuthState, _action: PayloadAction) {
      state.logoutLoading = true;
      state.logoutError = null;
    },
    logoutSuccess(state: AuthState, _action: PayloadAction<string>) {
      state.logoutLoading = false;
      state.user = null;
    },
    logoutFailure(state: AuthState, action: PayloadAction<{ error: any }>) {
      state.logoutLoading = false;
      state.logoutError = action.payload;
    },
    me(state: AuthState, action: PayloadAction<string>) {
      state.user = action.payload;
    },
  },
});

const { actions, reducer } = authSlice;

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  me,
} = actions;

export default reducer;
