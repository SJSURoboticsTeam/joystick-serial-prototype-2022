import { useRef, useState } from 'react';

import DriveControl from './components/DriveControl';
import ArmControl from './components/ArmControl';
import Camera from './components/Camera'
import Status from './components/Status';
import Serial from './components/Serial'
import { ArmFormat, DriveFormat } from './dto/commands';

function App() {
  const commands = useRef<string>("");
  const [isDriveControl, setIsDriveControl] = useState(true)
  const [status, setStatus] = useState<ArmFormat | DriveFormat>({ heartbeat_count: 0, is_operational: 1, wheel_orientation: 0, drive_mode: "D", speed: 0, angle: 0 });

  return (
    <div>
      <header className='btn-group'>
        <button className='btn btn__primary' onClick={() => setIsDriveControl(!isDriveControl)}>Toggle Mode</button>
        <Serial commands={commands} setStatus={setStatus} />
      </header>

      <div className="grid-container">
        {isDriveControl ? <DriveControl commands={commands} /> : <ArmControl commands={commands} />}
        <Status status={status} />
        <Camera name="0" src="http://raspberrypi:8000/stream.mjpg" />
        <Camera name="1" src="http://raspberrypi:8001/stream.mjpg" />
        <Camera name="2" src="http://raspberrypi:8002/stream.mjpg" />
        <Camera name="3" src="http://raspberrypi:8003/stream.mjpg" />
      </div>
    </div>
  );
}

export default App;