import { useStore } from 'store/store';
import { AppProps } from 'next/app';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from 'constants/theme';

const App = ({ Component, pageProps }: AppProps) => {
  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store, {}, () => {
    persistor.persist();
  });

  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading</div>} persistor={persistor}>
        <ThemeProvider theme={defaultTheme}>
          {<Component {...pageProps} />}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
