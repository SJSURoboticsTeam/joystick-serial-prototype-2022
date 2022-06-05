import React, { useState } from 'react';
import ReactPlayer from 'react-player'

import DriveControl from './components/DriveControl';
import DriveStatus from './components/DriveStatus';
import ArmControl from './components/ArmControl';
import ArmStatus from './components/ArmStatus'
import Camera from './components/Camera'

function App() {
  const [toggleMode, setToggleMode] = useState(true)
  const [toggleCamera1, setToggleCamera1] = useState(false)
  const [toggleCamera2, setToggleCamera2] = useState(false)
  const [toggleCamera3, setToggleCamera3] = useState(false)
  const [toggleCamera4, setToggleCamera4] = useState(false)

  return (
    <div >
      <header className='btn-group'>
        <button className='btn btn__primary' onClick={() => {
          setToggleMode(!toggleMode)
        }}>Toggle Mode</button>
        <button className='btn btn__primary' onClick={() => setToggleCamera1(!toggleCamera1)}>Toggle Camera 1</button>
        <button className='btn btn__primary' onClick={() => setToggleCamera2(!toggleCamera2)}>Toggle Camera 2</button>
        <button className='btn btn__primary' onClick={() => setToggleCamera3(!toggleCamera3)}>Toggle Camera 3</button>
        <button className='btn btn__primary' onClick={() => setToggleCamera4(!toggleCamera4)}>Toggle Camera 4</button>
      </header>
      <div className="grid-container">
        {toggleMode ? <DriveControl /> : <ArmControl />}
        {toggleMode ? <DriveStatus /> : <ArmStatus />}
        {toggleCamera1 && <Camera name="1" src="http://192.168.1.10:8082/index.html" />}
        {toggleCamera2 && <Camera name="2" src="network ip address, make it static" />}
        {toggleCamera3 && <Camera name="3" src="network ip address, make it static" />}
        {toggleCamera4 && <Camera name="4" src="network ip address, make it static" />}
      </div>
    </div >
  );
}

export default App;
