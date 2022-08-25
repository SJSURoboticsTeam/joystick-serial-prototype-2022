import React, { useEffect, useState } from 'react';

import DriveControl from './components/DriveControl';
import ArmControl from './components/ArmControl';
import Camera from './components/Camera'
import Status from './components/Status';

function App() {
  const [toggleMode, setToggleMode] = useState(true)
  const [roverStatus, setRoverStatus] = useState({})
  const [roverCommands, setRoverCommands] = useState()

  useEffect(() => {
    console.log(roverCommands)
  }, [roverCommands])

  function writeSerial() {
    console.log("write: ", roverCommands);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      writeSerial();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <header className='btn-group'>
        <button className='btn btn__primary' onClick={() => setToggleMode(!toggleMode)}>Toggle Mode</button>
      </header>

      <div className="grid-container">
        {toggleMode ? <DriveControl setRoverStatus={setRoverStatus} setRoverCommands={setRoverCommands} /> : <ArmControl />}
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