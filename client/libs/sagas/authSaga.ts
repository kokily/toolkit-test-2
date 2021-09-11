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
  meFailure,
  meRequest,
  meSuccess,
} from '../modules/auth';
import client from './client';

// Login Saga
function login(data: LoginPayload) {
  return client.post('/auth/login', data);
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
  return client.post('/auth/logout');
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

// Me Saga
function me() {
  return client.get('/auth/me');
}

function* meSaga() {
  try {
    const result = yield call(me);

    yield put(meSuccess(result.data));
  } catch (err) {
    yield put(meFailure(err.response.data));
  }
}

export function* watchMe() {
  yield takeLatest(meRequest.type, meSaga);
}
