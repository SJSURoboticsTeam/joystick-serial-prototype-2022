import { useRef, useState } from 'react';

import Wifi from './components/Wifi';
import Camera from './components/Camera'
import Status from './components/Status';
import Serial from './components/Serial'
import ArmControl from './components/ArmControl';
import DriveControl from './components/DriveControl';
import { ArmFormat, DriveFormat } from './dto/commands';

function App() {
  const commands = useRef<string>("");
  const [isDriveControl, setIsDriveControl] = useState(true)
  const [isSerial, setIsSerial] = useState(true);
  const [status, setStatus] = useState<ArmFormat | DriveFormat>();

  return (
    <div>
      <header className='btn-group'>
        <button className='btn btn__primary' onClick={() => setIsDriveControl(!isDriveControl)}>Toggle Mode</button>
        <button className='btn btn__primary' onClick={() => setIsSerial(!isSerial)}>Toggle Connection Type</button>
        {isSerial ? <Serial commands={commands} setStatus={setStatus} /> : <Wifi commands={commands} setStatus={setStatus} />}
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