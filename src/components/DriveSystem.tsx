import { useRef, useState, useEffect } from 'react';
import { useGamepads } from 'react-gamepads';

import { DriveCommandDTO, DriveCommandStringFormat } from '../util/formats';
import { WHEEL_ORIENTATIONS, DRIVE_MODES, DEFAULT_DRIVE_COMMANDS, MAX_TRANSLATE_ANGLE, MAX_DRIVE_ANGLE, MAX_DRIVE_SPEED } from '../util/constants';
import { DropdownButtonSelector, TextSliderInput, FooterButtons } from './Forms/ControlForm';

import DriveController from '../controllers/drive-controller';

export default function DriveSystem({ commands }) {
  const [gamepad, setGamepad] = useState<Gamepad>();
  const [driveCommands, setDriveCommands] = useState<DriveCommandDTO>(DEFAULT_DRIVE_COMMANDS);
  const MAX_ANGLE = driveCommands.drive_mode === "D" ? MAX_DRIVE_ANGLE : MAX_TRANSLATE_ANGLE;

  useGamepads((gamepads) => {
    if (gamepads[1]) {
      setGamepad(gamepads[1]);
    }
  });

  function updateCommands(newCommands) {
    commands.current = DriveCommandStringFormat(newCommands);
    setDriveCommands(newCommands);
  }

  function handleChange(e) {
    const newCommands = { ...driveCommands, [e.target.name]: e.target.value };
    if ((e.target.name === "drive_mode" || e.target.name === "wheel_orientation") && (e.target.value !== driveCommands[e.target.name])) {
      newCommands.speed = 0;
      newCommands.angle = 0;
    }
    updateCommands(newCommands);
  }

  function resetCommands() {
    updateCommands({
      ...DEFAULT_DRIVE_COMMANDS,
      drive_mode: driveCommands.drive_mode,
      wheel_orientation: driveCommands.wheel_orientation
    });
  }

  useEffect(() => {
    if (gamepad) {
      setDriveCommands(new DriveController(gamepad).getCommands());
    }
  }, [gamepad]);

  return (
    <div>
      <h2>Drive System</h2>
      <form onSubmit={(e) => { e.preventDefault() }}>
        <DropdownButtonSelector
          name='drive_mode'
          label='Drive Mode'
          options={DRIVE_MODES}
          value={driveCommands.drive_mode}
          onChange={handleChange}
        />
        <DropdownButtonSelector
          name='wheel_orientation'
          label='Wheel Orientation'
          options={WHEEL_ORIENTATIONS}
          value={driveCommands.wheel_orientation}
          onChange={handleChange}
        />
        <TextSliderInput
          name='speed'
          label='Speed'
          min={-MAX_DRIVE_SPEED}
          max={MAX_DRIVE_SPEED}
          value={driveCommands.speed}
          onChange={handleChange}
        />
        <TextSliderInput
          name='angle'
          label='Angle'
          min={-MAX_ANGLE}
          max={MAX_ANGLE}
          value={driveCommands.angle}
          onChange={handleChange}
          disabled={driveCommands.drive_mode === 'S'}
        />
        <FooterButtons onResetClick={resetCommands} />
      </form>
    </div >
  );
}

