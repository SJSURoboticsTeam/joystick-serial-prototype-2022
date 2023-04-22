import { useEffect, useRef, useState } from 'react';

import Wifi from './components/Wifi';
import Serial from './components/Serial';
import Camera from './components/Camera';
import Status from './components/Status';
import InverseKinematics from './components/InverseKinematics';
import ArmSystem from './components/ArmSystem';
import SerialWifi from './components/SerialWifi';
import DriveSystem from './components/DriveSystem';
import ScienceSystem from './components/ScienceSystem';
import AutonomySystem from './components/AutonomySystem';

import { ArmCommandDTO, DriveCommandDTO } from './util/command-dto';
import { armStringFormat, driveStringFormat, autonomyStringFormat } from './util/command-formats';
import { DEFAULT_ARM_COMMANDS, DEFAULT_DRIVE_COMMANDS, DEFAULT_AUTONOMY_COMMANDS } from './util/constants';

function App() {
  const commands = useRef<string>(driveStringFormat(DEFAULT_DRIVE_COMMANDS));
  const [status, setStatus] = useState<ArmCommandDTO | DriveCommandDTO>();
  const [communicationMode, setCommunicationMode] = useState('wifi');
  const [system, setSystem] = useState('drive');
  const [send, setSend] = useState(0);

  useEffect(() => {
    switch (system) {
      case 'drive':
        commands.current = driveStringFormat(DEFAULT_DRIVE_COMMANDS);
        break;
      case 'arm':
        commands.current = armStringFormat(DEFAULT_ARM_COMMANDS);
        break;
      case 'autonomy':
        commands.current = autonomyStringFormat(DEFAULT_AUTONOMY_COMMANDS);
        break;
      case 'science':
        // TODO: Add science commands format
        break;
      default:
        commands.current = driveStringFormat(DEFAULT_DRIVE_COMMANDS);
        break;
    }
  }, [system]);

  return (
    <div id="app">
      <header className='btn-group'>
        <div className='btn-group'>
          <select className='btn btn__primary ' onChange={(e) => { setSystem(e.target.value) }}>
            <option className='btn btn__primary' value={"drive"}>Drive System</option>
            <option className='btn btn__primary' value={"arm"}>Arm System</option>
            <option className='btn btn__primary' value={"autonomy"}>Autonomy System</option>
            <option className='btn btn__primary' value={"science"}>Science System</option>
          </select>
          <select className='btn btn__primary ' onChange={(e) => { setCommunicationMode(e.target.value) }}>
            <option className='btn btn__primary' value={"wifi"}>Wifi</option>
            <option className='btn btn__primary' value={"serial"}>Serial</option>
            <option className='btn btn__primary' value={"mimic"}>Mimic</option>
          </select>
        </div>
        {communicationMode === 'mimic' && <SerialWifi setStatus={setStatus} />}
        {communicationMode === 'wifi' && <Wifi commands={commands} setStatus={setStatus} />}
        {communicationMode === 'serial' && <Serial commands={commands} setStatus={setStatus} system={system} />}
      </header>

      <div className="grid-container">
        {system === 'arm' && <ArmSystem commands={commands} />}
        {system === 'drive' && <DriveSystem commands={commands} />}
        {system === 'autonomy' && <AutonomySystem commands={commands} />}
        {system === 'science' && <ScienceSystem commands={commands} />}
        <Status status={status} />
        {system === 'arm' && <InverseKinematics commands={commands} send={send} setSend={setSend}/>}
        {system === 'arm' && <button onClick={() => {setSend(1)}}>Send Commands</button>}
        <Camera name="0" src="http://raspberrypi:8000/stream.mjpg" />
        <Camera name="1" src="http://raspberrypi:8001/stream.mjpg" />
        <Camera name="2" src="http://raspberrypi:8002/stream.mjpg" />
        <Camera name="3" src="http://raspberrypi:8003/stream.mjpg" />
      </div>
    </div>
  );
}

export default App;