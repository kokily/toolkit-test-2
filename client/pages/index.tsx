import { END } from '@redux-saga/core';
import axios from 'axios';
import { connect } from 'react-redux';
import useLoggedIn from '../libs/hooks/useLoggedIn';
import useLogout from '../libs/hooks/useLogout';
import { RootState } from '../libs/modules';
import { meRequest } from '../libs/modules/auth';
import wrapper, { SagaStore } from '../libs/store';

function IndexPage() {
  const { user } = useLoggedIn();
  const { onLogout } = useLogout();

  return (
    <div>
      <h3>IndexPage</h3>
      {user && <button onClick={onLogout}>로그아웃</button>}
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';

    axios.defaults.headers.Cookie = '';

    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    await store.dispatch(meRequest());
    await store.dispatch(END);

    await (store as SagaStore).sagaTask.toPromise();

    return {
      props: {},
    };
  }
);

export default connect((state: RootState) => state)(IndexPage);
