import { NextPage } from 'next';
import { connect } from 'react-redux';
import { END } from '@redux-saga/core';
import useLoggedIn from '../../libs/hooks/useLoggedIn';
import { RootState } from '../../libs/modules';
import { listNoticesRequest } from '../../libs/modules/notices';
import wrapper, { SagaStore } from '../../libs/store';
import useListNotices from './hooks/useListNotices';

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(listNoticesRequest({}));
  store.dispatch(END);

  await (store as SagaStore).sagaTask.toPromise();

  return {
    props: {},
  };
});

const ListNoticesPage: NextPage = () => {
  useLoggedIn();
  const { notices } = useListNotices();

  return (
    <div>
      <h2>ListNoticesPage</h2>
      <h2>ListNoticesPage</h2>
      <h2>ListNoticesPage</h2>
      <h2>ListNoticesPage</h2>
      <h2>ListNoticesPage</h2>
      <h2>ListNoticesPage</h2>
      <h2>ListNoticesPage</h2>
      <h2>ListNoticesPage</h2>
      <h2>ListNoticesPage</h2>
      <h2>ListNoticesPage</h2>
      <h2>ListNoticesPage</h2>
    </div>
  );
};

export default connect((state: RootState) => state)(ListNoticesPage);
