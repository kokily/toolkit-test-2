import { END } from '@redux-saga/core';
import axios from 'axios';
import { connect } from 'react-redux';
import Title from '../../components/common/Title';
import AddNotice from '../../components/notices/AddNotice';
import useLoggedIn from '../../libs/hooks/useLoggedIn';
import { RootState } from '../../libs/modules';
import { meRequest } from '../../libs/modules/auth';
import wrapper, { SagaStore } from '../../libs/store';
import useAddNotice from './hooks/useAddNotice';

function AddNoticePage() {
  useLoggedIn();
  const notice = useAddNotice();

  return (
    <AddNotice
      title={notice.title}
      body={notice.body}
      thumbnail={notice.thumbnail}
      tags={notice.tags}
      onChangeTitle={notice.onChangeTitle}
      onChangeBody={notice.onChangeBody}
      onChangeTags={notice.onChangeTags}
      onBack={notice.onBack}
      onAddNotice={notice.onAddNotice}
    />
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

export default connect((state: RootState) => state)(AddNoticePage);
