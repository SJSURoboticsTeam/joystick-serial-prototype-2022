import React, { useState } from 'react';
import { useGamepads } from 'react-gamepads'
import DriveCommandStatus from './components/DriveCommandStatus';

import Gamepad from './util/Gamepad'
import Serial from './util/Serial';

function App(props) {
  const [commands, setCommands] = useState(props.commands);
  const [gamepads, setGamepads] = useState({});
  useGamepads(gamepads => setGamepads(gamepads));
  const [port, setPort] = useState<SerialPort>();

  function updateCommands() {
    const newCommand = [{ speed: gamepads[0]?.axes[1], angle: gamepads[0]?.axes[0], mode: 'D', wheel_orientation: 0 }];
    setCommands(newCommand);
  }

  const connect = async () => {
    await setPort(await navigator.serial.requestPort());
    await port.open({ baudRate: 9600 });
  }

  const disconnect = async () => {
    await port.close();
  }

  async function writeCommands() {
    const encoder = new TextEncoder();
    const writer = port.writable.getWriter();
    console.log(`Encoded value: ${commands[0].speed}`);
    await writer.write(encoder.encode(commands[0].speed));
    writer.releaseLock();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await writeCommands();
    console.log(`Sent: ${commands[0].speed}`);
  }

  return (
    <div className="App">
      <h1>Joystick-Serial Testing</h1>
      <div>Commands: {JSON.stringify(commands)}</div>
      <button onClick={updateCommands}>Update Commands</button>
      <h2>Serial</h2>
      <button onClick={() => connect()}>Connect</button>
      <button onClick={() => console.log(port)}>Status</button>
      <form onSubmit={handleSubmit}>
        <button type='submit'>Send</button>
      </form>
      <button onClick={() => disconnect()}>Disconnect</button>
      <Gamepad />
    </div>
  );
}

export default App;
