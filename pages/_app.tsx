import { useStore } from 'store/store';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from 'constants/theme';
import MainLayout from 'components/Common/MainLayout';

const App = ({ Component, pageProps }: AppProps) => {
  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store, {}, () => {
    persistor.persist();
  });

  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading</div>} persistor={persistor}>
        <ThemeProvider theme={defaultTheme}>
          <MainLayout>{<Component {...pageProps} />}</MainLayout>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
