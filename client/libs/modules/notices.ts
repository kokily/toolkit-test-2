import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _concat from 'lodash/concat';

export type NoticesState = {
  notices: NoticeType[];
  hasMoreNotices: boolean;
  listNoticesLoading: boolean;
  listNoticesError: any;
};

export type ListNoticesPayload = {
  title?: string;
  tag?: string;
  cursor?: string;
};

const initialState: NoticesState = {
  notices: [],
  hasMoreNotices: true,
  listNoticesLoading: false,
  listNoticesError: null,
};

const noticesSlice = createSlice({
  name: 'notices',
  initialState,
  reducers: {
    listNoticesRequest(state: NoticesState, _action: PayloadAction<ListNoticesPayload>) {
      state.listNoticesLoading = true;
      state.listNoticesError = null;
    },
    listNoticesSuccess(state: NoticesState, action: PayloadAction<NoticeType[]>) {
      state.listNoticesLoading = false;
      state.notices = _concat(state.notices, action.payload);
      state.hasMoreNotices = action.payload.length === 10;
    },
    listNoticesFailure(state: NoticesState, action: PayloadAction<{ error: any }>) {
      state.listNoticesLoading = false;
      state.listNoticesError = action.payload;
    },
  },
});

const { actions, reducer } = noticesSlice;

export const { listNoticesRequest, listNoticesSuccess, listNoticesFailure } = actions;

export default reducer;
