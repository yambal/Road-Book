import React from 'react';
import Button from '@mui/material/Button';
import { FileLoader } from './features/fileLoader/FileLoader';
import { MapView } from './features/mapView/MapView';
function App() {
  return (
    <div className="App">
      <Button variant="contained">Hello world</Button>
      <FileLoader />
      <MapView centerPotision={[35, 135]}/>
    </div>
  );
}

export default App;
