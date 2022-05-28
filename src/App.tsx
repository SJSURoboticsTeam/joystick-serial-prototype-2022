import React from 'react';

import DriveControl from './components/DriveControl';
import ArmControl from './components/ArmControl';
import DriveStatus from './components/DriveStatus';
import ArmStatus from './components/ArmStatus'
import Camera from './components/Camera'

function App() {
  return (
    <div className="grid-container">
      <DriveControl />
      <DriveStatus />
      {/* <ArmControl />
      <ArmStatus />
      <Camera name="1" />
      <Camera name="2" />
      <Camera name="3" />
      <Camera name="4" /> */}
    </div>
  );
}

export default App;
