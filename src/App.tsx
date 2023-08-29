import React from 'react';
import Button from '@mui/material/Button';
import { FileLoader } from './features/fileLoader/FileLoader';
function App() {
  return (
    <div className="App">
      <Button variant="contained">Hello world</Button>
      <FileLoader />
    </div>
  );
}

export default App;
