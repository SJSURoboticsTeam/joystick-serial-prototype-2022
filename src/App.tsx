import React, { useState } from 'react';
import { useGamepads } from 'react-gamepads'
import DriveCommandStatus from './components/DriveCommandStatus';
import { DriveCommandDTO } from './dto/drive-commands.dto';

import Gamepad from './util/Gamepad'
import Serial from './util/Serial';

function App(props) {
  const [commands, setCommands] = useState<Array<DriveCommandDTO>>(props.commands);

  function updateCommands(speed, angle, mode, wheel_orientation) {
    // const newCommand = [{ speed: gamepads[0]?.axes[1], angle: gamepads[0]?.axes[5], mode: 'D', wheel_orientation: 0 }];
    const newCommand = [{ speed, angle, mode, wheel_orientation }];
    setCommands(newCommand);
  }
  return (
    <div className="App">
      <h1>Joystick-Serial Testing</h1>
      <Serial />
    </div>
  );
}

export default App;
