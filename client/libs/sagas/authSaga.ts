import axios from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  loginFailure,
  LoginPayload,
  loginRequest,
  loginSuccess,
  logoutFailure,
  logoutRequest,
  logoutSuccess,
} from '../modules/auth';

axios.defaults.baseURL = 'http://localhost:4000/api/auth';
axios.defaults.withCredentials = true;

// Login Saga
function login(data: LoginPayload) {
  return axios.post('/login', data);
}

function* loginSaga(action: PayloadAction<LoginPayload>) {
  try {
    const result = yield call(login, action.payload);

    yield put(loginSuccess(result.data));
  } catch (err) {
    yield put(loginFailure(err.response.data));
  }
}

export function* watchLogin() {
  yield takeLatest(loginRequest.type, loginSaga);
}

// Logout Saga
function logout() {
  return axios.post('/logout');
}

function* logoutSaga() {
  try {
    const result = yield call(logout);

    yield put(logoutSuccess(result.data));
  } catch (err) {
    yield put(logoutFailure(err.response.data));
  }
}

export function* watchLogout() {
  yield takeLatest(logoutRequest.type, logoutSaga);
}
