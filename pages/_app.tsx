import { wrapper } from 'store';
import { AppProps } from 'next/app';
// import { Provider } from 'react-redux';
// import { persistStore } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

import defaultTheme from 'constants/theme';
import GlobalStyle from 'constants/theme/GlobalStyle';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default wrapper.withRedux(App);
