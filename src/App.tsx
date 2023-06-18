import { useEffect, useRef, useState } from 'react';

import OperationalViewAlpha from './components/operational-view-alpha/OperationalViewAlpha';
import Prototype from './components/prototype-assets/Prototype';

import { ArmCommandDTO, DriveCommandDTO } from './util/command-dto';
import { armStringFormat, driveStringFormat, autonomyStringFormat } from './util/command-formats';
import { DEFAULT_ARM_COMMANDS, DEFAULT_DRIVE_COMMANDS, DEFAULT_AUTONOMY_COMMANDS } from './util/constants';

function App() {

  return (
    <div id="app">
      <Prototype />
      {/* <OperationalViewAlpha commands = {commands} status={status}/> */}
    </div>
  );
}

export default App;