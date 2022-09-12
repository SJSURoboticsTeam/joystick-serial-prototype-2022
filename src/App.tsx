import { useEffect, useRef, useState } from 'react';

import DriveControl from './components/DriveControl';
import ArmControl from './components/ArmControl';
import Camera from './components/Camera'
import Status from './components/Status';
import Serial from './components/Serial'
import { ArmFormat, DriveFormat } from './dto/commands';

function App() {
  const [toggleMode, setToggleMode] = useState(true)
  const [roverStatus, setRoverStatus] = useState({ heartbeat_count: 0 })
  const [roverCommands, setRoverCommands] = useState({})
  const commands = useRef({})

  return (
    <div>
      <header className='btn-group'>
        <button className='btn btn__primary' onClick={() => setToggleMode(!toggleMode)}>Toggle Mode</button>
        <button className='btn btn__primary' onClick={() => console.log(commands.current)}>Status</button>
        {/* <Serial setRoverStatus={setRoverStatus} roverCommands={roverCommands} /> */}
      </header>

      <div className="grid-container">
        {toggleMode ? <DriveControl commands={commands} /> : <ArmControl commands={commands} />}
        <Status roverStatus={roverStatus} />
        <Camera name="1" src="http://raspberrypi:8000/stream.mjpg" />
        <Camera name="2" src="http://raspberrypi:8001/stream.mjpg" />
        <Camera name="3" src="http://raspberrypi:8002/stream.mjpg" />
        <Camera name="4" src="http://raspberrypi:8003/stream.mjpg" />
      </div>
    </div>
  );
}

export default App;