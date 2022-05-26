import React from 'react';

import DriveControl from './components/DriveControl';
import RoverStatus from './components/RoverStatus'
import Camera from './components/Camera'

function App() {
  return (
    <div className="grid-container">
      <DriveControl />
      <RoverStatus name="Drive" />
      <RoverStatus name="Arm" />
      <Camera name="1" />
      <Camera name="2" />
      <Camera name="3" />
      <Camera name="4" />
    </div>
  );
}

export default App;
