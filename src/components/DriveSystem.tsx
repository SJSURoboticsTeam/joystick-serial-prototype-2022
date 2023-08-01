import { useState, useEffect, useRef } from 'react';
import { useGamepads } from 'react-gamepads';

import {
  WHEEL_ORIENTATIONS,
  DRIVE_MODES,
  DEFAULT_DRIVE_COMMANDS,
  MIN_DRIVE_SPEED,
  MAX_DRIVE_SPEED,
  MAX_DRIVE_ANGLE,
  MAX_TRANSLATE_ANGLE,
} from '../util/constants';
import DriveController from '../controllers/drive/controller';
import { DriveCommandDTO } from '../util/command-dto';
import { driveStringFormat } from '../util/command-formats';
import { DropdownButtonSelector, TextSliderInput, FooterButtons } from './Forms/ControlForm';

export default function DriveSystem({ commands }) {
  const [gamepad, setGamepad] = useState<Gamepad>();
  const [driveCommands, setDriveCommands] = useState<DriveCommandDTO>(DEFAULT_DRIVE_COMMANDS);
  const MAX_ANGLE = driveCommands.drive_mode === "D" ? MAX_DRIVE_ANGLE : MAX_TRANSLATE_ANGLE;
  const commandsRef = useRef(DEFAULT_DRIVE_COMMANDS)
  const gamepadRef = useRef(gamepad);

  useGamepads((gamepads) => {
    if (gamepads[0]) {
      setGamepad(gamepads[0]);
    }
  });

  useEffect(() => {
    gamepadRef.current = gamepad;
  }, [gamepad])

  function updateCommands(newCommands) {
    commandsRef.current = newCommands;
    commands.current = driveStringFormat(newCommands);
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

  function updateController() {
    if(gamepadRef.current) {
      const currentCommands = commandsRef.current;
      const newCommands = new DriveController(gamepadRef.current)?.getCommands(currentCommands);
      if (newCommands.drive_mode === 'X') {
        newCommands.drive_mode = currentCommands.drive_mode;
      }
      if(newCommands.wheel_orientation === 3) {
        newCommands.wheel_orientation = currentCommands.wheel_orientation;
      }
      updateCommands({...newCommands});
    }
}

  useEffect(() => {
    const interval = setInterval(() => {
        updateController();
    }, 50);
    return () => clearInterval(interval);
  }, []);

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
          min={MIN_DRIVE_SPEED}
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

