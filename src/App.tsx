import React, { useState } from 'react';
import { useGamepads } from 'react-gamepads';

import Gamepad from './util/Gamepad'
import Serial from './util/Serial';

function App() {
  const [commands, setGamepads] = useState({});
  useGamepads(commands => setGamepads(commands));

  const [responses, setResponses] = useState(["example", "of", "responses"])
  const [userInput, setUserInput] = useState("");
  const [port, setPort] = useState<SerialPort>();

  const connect = async () => {
    await setPort(await navigator.serial.requestPort());
    await port.open({ baudRate: 9600 });
  }

  const disconnect = async () => {
    await port.close();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await writeCommands();
    console.log(`Sent: ${userInput}`);
    setUserInput("");
  }

  async function writeCommands() {
    const encoder = new TextEncoder();
    const writer = port.writable.getWriter();
    await writer.write(encoder.encode(userInput));
    writer.releaseLock();
  }

  function handleTriggerCommand() {
    const value = commands[0].buttons[0].pressed ? "0" : "1";
    setUserInput(value);
  }


  const commandDisplay = Object.keys(commands).map(command => {
    // console.log("displaying gamepad", commands[command]);
    return (
      <div>
        <h2>commands</h2>
        <h3>Joystick</h3>
        {commands[command].buttons[0].pressed && handleTriggerCommand()}

        {commands[command].axes &&
          commands[command].axes.map((axis, index) => (
            <div key={index}>
              {index}: {axis.toFixed(2)}
            </div>
          ))}
        <h3>Buttons</h3>
        {commands[command].buttons &&
          commands[command].buttons.map((button, index) => (
            <div key={index}>
              {index}: {button.value}
            </div>
          ))}

      </div>
    );
  });



  return (
    <div className="App">
      <h1>Joystick Telemetry Testing</h1>
      <div>{commandDisplay}</div>
      <div>
        <h2>Serial</h2>
        <button onClick={() => connect()}>Connect</button>
        <button onClick={() => console.log(port)}>Status</button>
        <form onSubmit={handleSubmit}>
          <input placeholder='send 0 to toggle off led' type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
          <button type='submit'>Send</button>
        </form>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
      {/* <Serial /> */}
      {/* <Gamepad /> */}
    </div>
  );
}

export default App;
