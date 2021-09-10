import qs from 'qs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../libs/modules';
import { listNoticesRequest } from '../../../libs/modules/notices';

export default function useListNotices(title?: string, tag?: string) {
  const dispatch = useDispatch();
  const { notices, hasMoreNotices, listNoticesLoading } = useSelector(
    (state: RootState) => state.notices
  );

  useEffect(() => {
    function onScroll() {
      if (hasMoreNotices && !listNoticesLoading) {
        if (
          window.scrollY + document.documentElement.clientHeight >
          document.documentElement.scrollHeight - 300
        ) {
          const cursor = notices[notices.length - 1]?.id;

          dispatch(listNoticesRequest({ title, tag, cursor }));
        }
      }
    }

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMoreNotices, listNoticesLoading, notices]);

  return {
    notices,
  };
}
