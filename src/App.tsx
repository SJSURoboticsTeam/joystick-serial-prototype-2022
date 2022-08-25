import React, { useState } from 'react';

import DriveControl from './components/DriveControl';
import ArmControl from './components/ArmControl';
import Camera from './components/Camera'
import Status from './components/Status';
import Terminal from './components/Terminal';

function App() {
  const [toggleMode, setToggleMode] = useState(true)
  const [roverStatus, setRoverStatus] = useState({})

  return (
    <div>
      <header className='btn-group'>
        <button className='btn btn__primary' onClick={() => setToggleMode(!toggleMode)}>Toggle Mode</button>
      </header>

      <div className="grid-container">
        {toggleMode ? <DriveControl setRoverStatus={setRoverStatus} /> : <ArmControl />}
        <div>
          <Status roverStatus={roverStatus} />
        </div>
        <Camera name="1" src="http://raspberrypi:8000/stream.mjpg" />
        <Camera name="2" src="http://raspberrypi:8001/stream.mjpg" />
        <Camera name="3" src="http://raspberrypi:8002/stream.mjpg" />
        <Camera name="4" src="http://raspberrypi:8003/stream.mjpg" />
      </div>
    </div>
  );
}

export default App;
