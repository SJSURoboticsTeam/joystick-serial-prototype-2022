import { useEffect, useState } from 'react';
import { useGamepads } from 'react-gamepads';

import { DriveCommandDTO, DriveCommandStringFormat } from '../util/formats';
import { WHEEL_ORIENTATIONS, DRIVE_MODES, DEFAULT_DRIVE_COMMANDS, MAX_TRANSLATE_ANGLE, MAX_DRIVE_ANGLE, MAX_DRIVE_SPEED } from '../util/constants';
import { DropdownButtonSelector, TextSliderInput, FooterButtons } from './Forms/ControlForm';

import Logitech3dProDriveControl from '../controllers/logitech-3d-pro/drive';
import Xbox360DriveControl from '../controllers/xbox-360/drive';

export default function DriveSystem({ commands }) {
  useGamepads((gamepads) => { setGamepads(gamepads[0]) });

  const [gamepad, setGamepads] = useState<Gamepad>();
  const [driveCommands, setDriveCommands] = useState<DriveCommandDTO>(DEFAULT_DRIVE_COMMANDS);
  const MAX_ANGLE = driveCommands.drive_mode === "D" ? MAX_DRIVE_ANGLE : MAX_TRANSLATE_ANGLE;

  function updateCommands(newCommands) {
    commands.current = DriveCommandStringFormat(newCommands);
    setDriveCommands(newCommands);
  }

  function handleChange(e) {
    const newCommands = { ...driveCommands, [e.target.name]: e.target.value };
    if (e.target.name === "drive_mode" || e.target.name === "wheel_orientation") {
      newCommands.speed = 0;
      newCommands.angle = 0;
    }
    updateCommands(newCommands);
  }

  useEffect(() => {
    if (gamepad) {
      const gamepadId: string = gamepad?.id.toLowerCase() || '';
      let newCommands = { ...driveCommands };
      if (gamepadId.includes('extreme 3d') || gamepadId.includes('logitech')) {
        newCommands = new Logitech3dProDriveControl(gamepad).getCommands();
      }
      if (gamepadId.includes('microsoft') || gamepadId.includes('xbox')) {
        newCommands = new Xbox360DriveControl(gamepad).getCommands();
      }
      updateCommands(newCommands);
      console.log(DriveCommandStringFormat(newCommands));
    }
  }, [gamepad]);

  return (
    <div>
      <h2>Drive System</h2>
      <form onSubmit={(e) => { e.preventDefault() }}>
        <DropdownButtonSelector name='drive_mode' label='Drive Mode' value={driveCommands.drive_mode} onChange={handleChange} options={DRIVE_MODES} />
        <DropdownButtonSelector name='wheel_orientation' label='Wheel Orientation' value={driveCommands.wheel_orientation} onChange={handleChange} options={WHEEL_ORIENTATIONS} />
        <TextSliderInput name='speed' label='Speed' min={-MAX_DRIVE_SPEED} max={MAX_DRIVE_SPEED} value={driveCommands.speed} onChange={handleChange} />
        <TextSliderInput name='angle' label='Angle' min={-MAX_ANGLE} max={MAX_ANGLE} value={driveCommands.angle} onChange={handleChange} disabled={driveCommands.drive_mode === 'S'} />
        <FooterButtons onResetClick={() => { updateCommands({ ...DEFAULT_DRIVE_COMMANDS, drive_mode: driveCommands.drive_mode, wheel_orientation: driveCommands.wheel_orientation }) }} />
      </form>
    </div >
  );
}

