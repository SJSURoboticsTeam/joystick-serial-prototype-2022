import React, { useState } from 'react';

import Gamepad from './util/Gamepad'

function App() {
  const [serial, setCommands] = useState("");
  const [readback, setReadback] = useState("");

  let port: SerialPort | undefined;


  const connect = async () => {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    console.log("Connected");
  }

  const write = async () => {
    const writer = port.writable.getWriter();
    const data = new Uint8Array([48, 48, 48, 48, 48]); // sends 5 zeros - blinks device 5 times
    await writer.write(data);
    writer.releaseLock();
  }

  const read = async () => {
    while (port.readable) {
      const reader = port.readable.getReader();

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            // Allow the serial port to be closed later.
            reader.releaseLock();
            break;
          }
          if (value) {
            console.log(value);
            setReadback(value.toString());
          }
        }
      } catch (error) {
        // TODO: Handle non-fatal read error.
      }
    }
  }

  const disconnect = async () => {
    await port.close();
    console.log("Disconnected");
  }

  function handleSubmit(e) {
    e.preventDefault();
    write();
    console.log(`Sent: ${serial}`)
    setCommands("");
  }

  return (
    <div className="App">
      <h1>Gamepads</h1>
      <button onClick={() => connect()}> Connect </button>

      <form onSubmit={handleSubmit}>
        <input type="text" disabled={true} value={serial} onChange={(e) => setCommands(e.target.value)} />
        <button type='submit'>Send</button>
      </form>

      <button onClick={() => disconnect()}> Disconnect </button>
      <button onClick={() => read()}> Listen </button>
      {readback}
      {/* <Gamepad /> */}
    </div>
  );
}

export default App;
