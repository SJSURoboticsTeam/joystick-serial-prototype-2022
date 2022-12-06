import { useEffect, useRef, useState } from 'react';

import Wifi from './components/Wifi';
import Camera from './components/Camera'
import Status from './components/Status';
import Serial from './components/Serial'
import ArmControl from './components/ArmControl';
import DriveControl from './components/DriveControl';
import { ArmFormat, DriveFormat } from './dto/commands';
import MapContainer from './components/GpsMap';

function App() {
  const commands = useRef<string>("");
  const [queue,setQueue]=useState([]);
  const [isDriveControl, setIsDriveControl] = useState(true)
  const [isSerial, setIsSerial] = useState(true);
  const [status, setStatus] = useState<ArmFormat | DriveFormat>();
 console.log('command->',commands)
 useEffect(()=>
 {
  console.log(queue)

 },[queue])
  return (
    <div>
      <header className='btn-group'>
        <button className='btn btn__primary' onClick={() => setIsDriveControl(!isDriveControl)}>Toggle Mode</button>
        <button className='btn btn__primary' onClick={() => setIsSerial(!isSerial)}>Toggle Connection Type</button>
        {isSerial ? <Serial commands={commands} setStatus={setStatus} isDriveControl={isDriveControl} /> : <Wifi commands={commands} setStatus={setStatus} />}
      </header>

      <div className="grid-container">
        {isDriveControl ? <DriveControl commands={commands} /> : <ArmControl commands={commands} />}
        <Status status={status} />
        <Camera name="0" src="http://raspberrypi:8000/stream.mjpg" />
        <Camera name="1" src="http://raspberrypi:8001/stream.mjpg" />
        <Camera name="2" src="http://raspberrypi:8002/stream.mjpg" />
        <Camera name="3" src="http://raspberrypi:8003/stream.mjpg" />
        <MapContainer setQueue={setQueue} commands={commands} />
        <div>
           <table style={{width:'100%',border:'1px solid grey'}}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                </tr>
              </thead>
              <tbody>
                {queue.map((element,index)=><tr>
                  <td>{index+1}</td>
                  <td>{element.lat}</td>
                  <td>{element.lng}</td>
                </tr>)}
              </tbody>
           </table>
        </div>
        {/* <MapContainer /> */}
      </div>
    </div>
  );
}

export default App;