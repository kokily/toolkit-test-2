import { AppProps } from 'next/app';
import withReduxSaga from 'next-redux-saga';
import wrapper from '../libs/store';
import 'react-quill/dist/quill.snow.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(withReduxSaga(App));
