import { Provider } from 'react-redux';
import { persistor, store } from '../app/store';
import ScrollToTop from '../components/common/ScrollTop';
import Seo from '../components/common/seo';
import '../index.scss';
import { PersistGate } from 'redux-persist/integration/react';
import { LinearProgress } from '@mui/material';
import { useState } from 'react';
import { Router } from 'next/router';
// import zIndex from '@mui/material/styles/zIndex';
if (typeof window !== 'undefined') {
  require('bootstrap/dist/js/bootstrap');
}

function MyApp({ Component, pageProps }) {
  const [progress, setProgress] = useState(false);

  Router.events.on('routeChangeStart', () => {
    setProgress(true);
    //function will fired when route change started
  });

  Router.events.on('routeChangeComplete', () => {
    setProgress(false);
    //function will fired when route change ended
  });

  return (
    <>
      {progress && (
        <LinearProgress style={{ display: 'absolute', zIndex: '10000' }} />
      )}

      <Seo
        font={
          'https://fonts.googleapis.com/css?family=Nunito:400,400i,500,600,700&display=swap'
        }
      />

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>

      <ScrollToTop />
    </>
  );
}

export default MyApp;
