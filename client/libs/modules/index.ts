import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers, AnyAction } from 'redux';
import auth, { AuthState } from './auth';
import notices, { NoticesState } from './notices';

export type State = {
  auth: AuthState;
  notices: NoticesState;
};

const rootReducer = (state: State | undefined, action: AnyAction): State => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default:
      const combineReducer = combineReducers({
        auth,
        notices,
      });

      return combineReducer(state, action);
  }
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
