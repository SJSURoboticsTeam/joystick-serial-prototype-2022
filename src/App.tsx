import { useEffect, useRef, useState } from 'react';

import Wifi from './components/Wifi';
import Serial from './components/Serial';
import Camera from './components/Camera';
import Status from './components/Status';
// import MapContainer from './components/GpsMap';
import ArmSystem from './components/ArmSystem';
import DriveSystem from './components/DriveSystem';
import MMTSystem from './components/MMTSystem';
import { ArmCommandDTO, DriveCommandDTO, MMTCommandDTO } from './util/command-dto';
import { armStringFormat, driveStringFormat } from './util/command-formats';
import { DEFAULT_ARM_COMMANDS, DEFAULT_DRIVE_COMMANDS } from './util/constants';


function App() {
  const commands = useRef<string>(driveStringFormat(DEFAULT_DRIVE_COMMANDS));
  const [isDriveControl, setIsDriveControl] = useState(true)
  // const [queue, setQueue] = useState<{ lat: number, lng: number }[]>([]);
  const [isArmControl, setIsArmControl] = useState(false)
  const [isSerial, setIsSerial] = useState(true);
  const [status, setStatus] = useState<ArmCommandDTO | DriveCommandDTO>();
  const [command, setMimic] = useState<ArmCommandDTO>();

  const [controlType, setControlType] = useState('drive');

  console.log(commands.current)
  useEffect(() => {
    commands.current = isDriveControl ? driveStringFormat(DEFAULT_DRIVE_COMMANDS) : armStringFormat(DEFAULT_ARM_COMMANDS);
  }, [isDriveControl]);

  return (
    <div id="app">
      <header className='btn-group'>
        <div className="dropdown-selector-group">
          <select className='btn btn__primary ' onChange={(e) => {setControlType(e.target.value)}}>  

              <option className='btn btn__primary' value={"drive"} >Drive System</option>
              <option className='btn btn__primary' value={"mmt"} >MMT System</option> 
              
              <option className='btn btn__primary' value={"arm"} >Arm System</option>
                        
          </select>
          </div>
        
        <Serial commands={commands} isDriveControl={isDriveControl} />
        <Wifi commands={commands} setStatus={setStatus} />
      </header>
      

      <div className="grid-container">
        
        {controlType === 'drive' && <DriveSystem commands={commands} /> } 
        {controlType === 'arm' && <ArmSystem commands={commands} /> } 
        {controlType === 'mmt' && <MMTSystem /> }
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