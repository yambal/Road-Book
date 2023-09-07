import React from 'react';
import { Provider } from 'react-redux'
import { store } from './app/store'
import { Layout } from './components/Layout';
import { DrawerProvider } from './providers/DrawerProvider';
import { GlobalStyles, ThemeProvider, css } from '@mui/material';
import { theme } from './style/theme';
import { normalize } from 'polished';
import { Router } from './routers/Router';
import { DrawerRouter } from './routers/DrawerRouider';

const globalCss = css(normalize(), {
  html: {
    height: '100%'
  },
  body: {
    height: '100%',
    overflow: 'hidden'
  },
  "#root": {
    height: '100%'
  },
  iframe: {
    display: 'none'
  }
})

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles
        styles={globalCss}
      />
      <ThemeProvider theme={theme}>
        <DrawerProvider>
          <Layout
            drawerContents={<DrawerRouter />}
            drawerWidth={240}
          >
            <Router />
          </Layout>
        </DrawerProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
