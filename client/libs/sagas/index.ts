import { all, fork } from 'redux-saga/effects';
import { watchLogin, watchLogout } from './authSaga';
import { watchListNotices } from './noticesSaga';

export default function* rootSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchListNotices)]);
}
