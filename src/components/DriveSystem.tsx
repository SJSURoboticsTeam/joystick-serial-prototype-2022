import { useEffect, useState } from 'react';
import { useGamepads } from 'react-gamepads';

import { DriveCommandDTO, DriveCommandStringFormat } from '../util/formats';
import { WHEEL_ORIENTATIONS, MODES, DEFAULT_DRIVE_COMMANDS } from '../util/constants';
import { DropdownButtonSelector, TextSliderInput, FooterButtons } from './Forms/ControlForm';

import Logitech3dProDriveControl from '../controllers/logitech-3d-pro/drive';
import Xbox360DriveControl from '../controllers/xbox-360/drive';

export default function DriveSystem({ commands }) {
  useGamepads((gamepads) => {
    setGamepads(gamepads[0]);
  });

  const [gamepad, setGamepads] = useState<Gamepad>();
  const [driveCommands, setDriveCommands] = useState<DriveCommandDTO>(DEFAULT_DRIVE_COMMANDS);

  async function handleSubmit(e) {
    e.preventDefault();
    commands.current = DriveCommandStringFormat(driveCommands);
    console.log("submitting", commands.current);
  }

  function handleChange(e) {
    setDriveCommands({ ...driveCommands, [e.target.name]: e.target.value });
  }

  function handleCommandChange(e, index) {
    const newArray = [...driveCommands.CMD];
    newArray[index] = e.target.value;
    setDriveCommands({ ...driveCommands, CMD: newArray });
  }

  useEffect(() => {
    const gamepadId: string = gamepad?.id.toLowerCase() || '';
    if (gamepadId.includes('extreme 3d') || gamepadId.includes('logitech')) {
      let logitech = new Logitech3dProDriveControl(gamepad);
      setDriveCommands(logitech.getCommands());
    }
    if (gamepadId.includes('microsoft') || gamepadId.includes('xbox')) {
      let xbox: Xbox360DriveControl = new Xbox360DriveControl(gamepad);
      setDriveCommands(xbox.getCommands());
    }
    commands.current = DriveCommandStringFormat(driveCommands);
  }, [gamepad]);

  useEffect(() => {
    handleSubmit(new Event('submit'));
  }, [driveCommands, handleSubmit]);

  return (
    <div>
      <h2>Drive System</h2>
      <form onSubmit={handleSubmit}>
        <DropdownButtonSelector name='DM' value={driveCommands.DM} onChange={handleChange} options={MODES} />
        <DropdownButtonSelector name='WO' value={driveCommands.WO} onChange={handleChange} options={WHEEL_ORIENTATIONS} />
        <TextSliderInput label='Speed' min={-100} max={100} value={driveCommands.CMD[0]} onChange={(e) => handleCommandChange(e, 0)} />
        <TextSliderInput label='Angle' min={driveCommands.DM === "T" ? -45 : -12} max={driveCommands.DM === "T" ? 45 : 12} value={driveCommands.CMD[1]} onChange={(e) => handleCommandChange(e, 1)} disabled={driveCommands.DM === 'S'} />
        <FooterButtons onResetClick={() => setDriveCommands(DEFAULT_DRIVE_COMMANDS)} />
      </form>
    </div>
  );
}

