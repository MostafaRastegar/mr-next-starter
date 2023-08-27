import { wrapper } from 'store/store';
import type { AppProps } from 'next/app';
// import { Provider } from 'react-redux';
// import { persistStore } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import { Provider } from "react-redux";

import defaultTheme from 'constants/theme';
import GlobalStyle from 'constants/theme/GlobalStyle';

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const {  pageProps } = props;
  return (
        <Provider store={store}>

    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
    </Provider>

  );
};

export default App;
