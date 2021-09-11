import { all, fork } from 'redux-saga/effects';
import { watchLogin, watchLogout, watchMe } from './authSaga';
import { watchAddNotice, watchListNotices } from './noticesSaga';

export default function* rootSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchMe),
    fork(watchListNotices),
    fork(watchAddNotice),
  ]);
}
