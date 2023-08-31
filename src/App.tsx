import React from 'react';
import { FileLoader } from './features/fileLoader/FileLoader';
import { MapView } from './features/mapView/MapView';
import { Provider } from 'react-redux'
import { store } from './app/store'
import { Counter } from './features/counter/Counter';
import { Layout } from './components/Layout';
import { DrawerProvider } from './providers/DrawerProvider';
import { GlobalStyles, ThemeProvider } from '@mui/material';
import { theme } from './style/theme';
import { normalize } from 'polished';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles
        styles={normalize()}
      />
      <ThemeProvider theme={theme}>
        <DrawerProvider>
          <Layout
            drawerContents={<>Drawer</>}
            drawerWidth={240}
          >
            <FileLoader />
            <MapView centerPotision={[35, 135]}/>
            <Counter />
          </Layout>
        </DrawerProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
