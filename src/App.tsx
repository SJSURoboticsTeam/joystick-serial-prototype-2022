import React, { useState } from 'react';

import Gamepad from './util/Gamepad'
import Serial from './util/Serial';

function App() {
  return (
    <div className="App">
      <h1>Joystick Telemetry Testing</h1>
      <Serial />
      <Gamepad />
    </div>
  );
}

export default App;
