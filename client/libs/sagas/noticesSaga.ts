import { call, put, takeLatest } from 'redux-saga/effects';
import qs from 'qs';
import {
  addNoticeFailure,
  AddNoticePayload,
  addNoticeRequest,
  addNoticeSuccess,
  listNoticesFailure,
  ListNoticesPayload,
  listNoticesRequest,
  listNoticesSuccess,
} from '../modules/notices';
import { PayloadAction } from '@reduxjs/toolkit';
import client from './client';

// List Notices Saga
function listNotices(data: ListNoticesPayload) {
  const queryString = qs.stringify(data);

  return client.get(`/notices?${queryString}`);
}

function* listNoticesSaga(action: PayloadAction<ListNoticesPayload>) {
  try {
    const result = yield call(listNotices, action.payload);

    yield put(listNoticesSuccess(result.data));
  } catch (err) {
    yield put(listNoticesFailure(err.response.data));
  }
}

export function* watchListNotices() {
  yield takeLatest(listNoticesRequest.type, listNoticesSaga);
}

// Add Notice Saga
function addNotice(data: AddNoticePayload) {
  return client.post('/notices', data);
}

function* addNoticeSaga(action: PayloadAction<AddNoticePayload>) {
  try {
    const result = yield call(addNotice, action.payload);

    yield put(addNoticeSuccess(result.data));
  } catch (err) {
    yield put(addNoticeFailure(err.response.data));
  }
}

export function* watchAddNotice() {
  yield takeLatest(addNoticeRequest.type, addNoticeSaga);
}
