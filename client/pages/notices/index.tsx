import { NextPage } from 'next';
import { connect } from 'react-redux';
import { END } from '@redux-saga/core';
import { RootState } from '../../libs/modules';
import { listNoticesRequest } from '../../libs/modules/notices';
import wrapper, { SagaStore } from '../../libs/store';
import useListNotices from './hooks/useListNotices';
import useSearch from './hooks/useSearch';

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(listNoticesRequest({}));
  store.dispatch(END);

  await (store as SagaStore).sagaTask.toPromise();

  return {
    props: {},
  };
});

const ListNoticesPage: NextPage = () => {
  const { title, tag, onChange, onTag } = useSearch();
  const { notices } = useListNotices(title, tag);

  return (
    <div>
      <h2>ListNoticesPage</h2>

      <div>
        검색
        <input type="text" name="title" value={title} onChange={onChange} />
      </div>
      <div>
        {notices && notices.length > 0 ? (
          <div>
            {notices.map((notice) => (
              <div key={notice.id}>
                <h2>{notice.title}</h2>
                <ul>
                  {notice.tags.map((tag) => (
                    <li key={tag}>#{tag}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div>아직 작성된 공지사항이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default connect((state: RootState) => state)(ListNoticesPage);
