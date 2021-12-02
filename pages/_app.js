import { useStore } from 'store/store';
// import { AppProps } from 'next/app';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from 'constants/theme';

const App = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store, {}, () => {
    persistor.persist();
  });

  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading</div>} persistor={persistor}>
        <ThemeProvider theme={defaultTheme}>
          {
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Component {...pageProps} />
          }
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

App.propTypes = {
  Component: PropTypes.node.isRequired,
  pageProps: PropTypes.object.isRequired,
};
export default App;
