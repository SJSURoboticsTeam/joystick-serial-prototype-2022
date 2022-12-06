import { useEffect, useRef, useState } from 'react';

import Wifi from './components/Wifi';
import Serial from './components/Serial';
import Camera from './components/Camera';
import Status from './components/Status';
import MapContainer from './components/GpsMap';
import ArmSystem from './components/ArmSystem';
import DriveSystem from './components/DriveSystem';
import { DEFAULT_ARM_COMMANDS, DEFAULT_DRIVE_COMMANDS } from './util/constants';
import { ArmCommandDTO, ArmStringFormat, DriveCommandDTO, DriveStringFormat } from './util/formats';

function App() {
  const commands = useRef<string>(DriveStringFormat(DEFAULT_DRIVE_COMMANDS));
  const [isDriveControl, setIsDriveControl] = useState(true)
  const [isSerial, setIsSerial] = useState(true);
  const [status, setStatus] = useState<ArmCommandDTO | DriveCommandDTO>();

  useEffect(() => {
    commands.current = isDriveControl ? DriveStringFormat(DEFAULT_DRIVE_COMMANDS) : ArmStringFormat(DEFAULT_ARM_COMMANDS);
  }, [isDriveControl]);

  return (
    <div>
      <header className='btn-group'>
        <button className='btn btn__primary' onClick={() => setIsDriveControl(!isDriveControl)}>Toggle Mode</button>
        <button className='btn btn__primary' onClick={() => setIsSerial(!isSerial)}>Toggle Connection Type</button>
        {isSerial ? <Serial commands={commands} setStatus={setStatus} /> : <Wifi commands={commands} setStatus={setStatus} />}
      </header>

      <div className="grid-container">
        {isDriveControl ? <DriveSystem commands={commands} /> : <ArmSystem commands={commands} />}
        <Status status={status} />
        <Camera name="0" src="http://raspberrypi:8000/stream.mjpg" />
        <Camera name="1" src="http://raspberrypi:8001/stream.mjpg" />
        <Camera name="2" src="http://raspberrypi:8002/stream.mjpg" />
        <Camera name="3" src="http://raspberrypi:8003/stream.mjpg" />
        {/* <MapContainer /> */}
      </div>
    </div>
  );
}

export default App;