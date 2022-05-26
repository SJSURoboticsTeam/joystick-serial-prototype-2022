import React from 'react';

import Serial from './components/Serial';
import RoverStatus from './components/RoverStatus'
import Camera from './components/Camera'

function App() {
  return (
    <div className="grid-container">
      <Serial />
      <RoverStatus />
      <RoverStatus />
      <Camera name={"1"} />
      <Camera name={"2"} />
      <Camera name={"3"} />
      <Camera name={"4"} />
    </div>
  );
}

export default App;
