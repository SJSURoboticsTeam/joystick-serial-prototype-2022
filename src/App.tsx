import { useEffect, useRef, useState } from 'react';

import OperationalView1 from './components/operational-view-alpha/OperationalViewAlpha';
import Prototype from './components/prototype-assets/Prototype';

import { ArmCommandDTO, DriveCommandDTO } from './util/command-dto';
import { armStringFormat, driveStringFormat, autonomyStringFormat } from './util/command-formats';
import { DEFAULT_ARM_COMMANDS, DEFAULT_DRIVE_COMMANDS, DEFAULT_AUTONOMY_COMMANDS } from './util/constants';

function App() {
  const commands = useRef<string>(driveStringFormat(DEFAULT_DRIVE_COMMANDS));
  const [status, setStatus] = useState<ArmCommandDTO | DriveCommandDTO>();
  const [communicationMode, setCommunicationMode] = useState('wifi');
  const [system, setSystem] = useState('drive');

  return (
    <div id="app">
      <Prototype />
      {/* <OperationalView1 commands = {commands} /> */}
    </div>
  );
}

export default App;