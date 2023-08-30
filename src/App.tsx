import React from 'react';
import { FileLoader } from './features/fileLoader/FileLoader';
import { MapView } from './features/mapView/MapView';
import { Provider } from 'react-redux'
import { store } from './app/store'
import { Counter } from './features/counter/Counter';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <FileLoader />
        <MapView centerPotision={[35, 135]}/>
        <Counter />
      </div>
    </Provider>
  );
}

export default App;
