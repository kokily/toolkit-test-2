import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _concat from 'lodash/concat';

export type NoticesState = {
  notices: NoticeType[];
  hasMoreNotices: boolean;
  listNoticesLoading: boolean;
  listNoticesError: any;
  addNoticeLoading: boolean;
  addNoticeError: any;
};

export type ListNoticesPayload = {
  title?: string;
  tag?: string;
  cursor?: string;
};

export type AddNoticePayload = {
  title: string;
  body: string;
  thumbnail?: string;
  tags: string[];
};

const initialState: NoticesState = {
  notices: [],
  hasMoreNotices: true,
  listNoticesLoading: false,
  listNoticesError: null,
  addNoticeLoading: false,
  addNoticeError: null,
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
    addNoticeRequest(state: NoticesState, _action: PayloadAction<AddNoticePayload>) {
      state.addNoticeLoading = true;
      state.addNoticeError = null;
    },
    addNoticeSuccess(state: NoticesState, _action: PayloadAction<AddNoticePayload>) {
      state.addNoticeLoading = false;
    },
    addNoticeFailure(state: NoticesState, action: PayloadAction<{ error: any }>) {
      state.addNoticeLoading = false;
      state.addNoticeError = action.payload;
    },
  },
});

const { actions, reducer } = noticesSlice;

export const {
  listNoticesRequest,
  listNoticesSuccess,
  listNoticesFailure,
  addNoticeRequest,
  addNoticeSuccess,
  addNoticeFailure,
} = actions;

export default reducer;
