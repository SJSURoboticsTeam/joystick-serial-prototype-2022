import React, { useState } from 'react';

import DriveControl from './components/DriveControl';
import ArmControl from './components/ArmControl';
import Camera from './components/Camera'
import Status from './components/Status';

function App() {
  const [toggleMode, setToggleMode] = useState(true)
  const [toggleCamera1, setToggleCamera1] = useState(false)
  const [toggleCamera2, setToggleCamera2] = useState(false)
  const [toggleCamera3, setToggleCamera3] = useState(false)
  const [toggleCamera4, setToggleCamera4] = useState(false)
  const [roverStatus, setRoverStatus] = useState({ heartbeatCount: 0, isOperational: 0 })

  return (
    <div>
      <header className='btn-group'>
        <button className='btn btn__primary' onClick={() => setToggleMode(!toggleMode)}>Toggle Mode</button>
        <button className='btn btn__primary' onClick={() => setToggleCamera1(!toggleCamera1)}>Toggle Camera 1</button>
        <button className='btn btn__primary' onClick={() => setToggleCamera2(!toggleCamera2)}>Toggle Camera 2</button>
        <button className='btn btn__primary' onClick={() => setToggleCamera3(!toggleCamera3)}>Toggle Camera 3</button>
        <button className='btn btn__primary' onClick={() => setToggleCamera4(!toggleCamera4)}>Toggle Camera 4</button>
      </header>

      <div className="grid-container">
        {toggleMode ? <DriveControl /> : <ArmControl />}
        <Status roverStatus={roverStatus} />
        {toggleCamera1 && <Camera name="1" src="http://raspberrypi:8000/stream.mjpg" />}
        {toggleCamera2 && <Camera name="2" src="http://raspberrypi:8001/stream.mjpg" />}
        {toggleCamera3 && <Camera name="3" src="http://raspberrypi:8002/stream.mjpg" />}
        {toggleCamera4 && <Camera name="4" src="http://raspberrypi:8003/stream.mjpg" />}
      </div>
    </div >
  );
}

export default App;
