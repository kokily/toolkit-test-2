import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import qs from 'qs';
import {
  listNoticesFailure,
  ListNoticesPayload,
  listNoticesRequest,
  listNoticesSuccess,
} from '../modules/notices';
import { PayloadAction } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'http://localhost:4000/api/notices';
axios.defaults.withCredentials = true;

// List Notices Saga
function listNotices(data: ListNoticesPayload) {
  const queryString = qs.stringify(data);

  return axios.get(`/?${queryString}`);
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
