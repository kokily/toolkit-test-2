import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  user: string | null;
  loginLoading: boolean;
  loginError: any;
  logoutLoading: boolean;
  logoutError: any;
  meLoading: boolean;
  meError: any;
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
  meLoading: false,
  meError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state: AuthState, _action: PayloadAction<LoginPayload>) {
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
    meRequest(state: AuthState, _action: PayloadAction) {
      state.meLoading = true;
      state.meError = null;
    },
    meSuccess(state: AuthState, action: PayloadAction<string>) {
      state.meLoading = false;
      state.user = action.payload;
    },
    meFailure(state: AuthState, action: PayloadAction<{ error: any }>) {
      state.meLoading = false;
      state.meError = action.payload;
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
  meRequest,
  meSuccess,
  meFailure,
} = actions;

export default reducer;
