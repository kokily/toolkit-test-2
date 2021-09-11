import { END } from '@redux-saga/core';
import axios from 'axios';
import Title from '../../components/common/Title';
import useLoggedIn from '../../libs/hooks/useLoggedIn';
import { meRequest } from '../../libs/modules/auth';
import wrapper, { SagaStore } from '../../libs/store';
import useAddNotice from './hooks/useAddNotice';

function AddNoticePage() {
  useLoggedIn();
  const notice = useAddNotice();

  return (
    <div>
      <Title value={notice.title} onChange={notice.onChangeTitle} />
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

export default AddNoticePage;
