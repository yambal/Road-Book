import React from 'react';
import { FileLoader } from './features/fileLoader/FileLoader';
import { Provider } from 'react-redux'
import { store } from './app/store'
import { Layout } from './components/Layout';
import { DrawerProvider } from './providers/DrawerProvider';
import { GlobalStyles, ThemeProvider } from '@mui/material';
import { theme } from './style/theme';
import { normalize } from 'polished';
import { Router } from './routers/Router';
import { DrawerRouter } from './routers/DrawerRouider';



function App() {
  return (
    <Provider store={store}>
      <GlobalStyles
        styles={normalize()}
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
