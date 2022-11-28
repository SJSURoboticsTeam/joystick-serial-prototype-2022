import { useEffect, useState } from 'react';
import { useGamepads } from 'react-gamepads';

import { DriveCommandDTO, DriveCommandStringFormat } from '../util/formats';
import { WHEEL_ORIENTATIONS, MODES, DEFAULT_DRIVE_COMMANDS } from '../util/constants';
import { DropdownButtonSelector, TextSliderInput, FooterButtons } from './Forms/ControlForm';

import { Extreme3DPro } from '../controllers/logitech-3d-pro/mapping';

import XboxDriveControl from '../controllers/xbox-360/drive'

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
    handleSubmit(new Event('submit'));
  }, [driveCommands, handleSubmit]);

  useEffect(() => {
    function getLogitechSpeed(): number {
      if (gamepad?.buttons[Extreme3DPro.enable_speed].pressed) {
        return parseInt(
          (-gamepad?.axes[Extreme3DPro.speed] * 100).toFixed(0)
        );
      }
      const throttleSpeed = parseInt(
        (
          ((parseInt((-gamepad?.axes[Extreme3DPro.cruise_control] * 100).toFixed(0)) +
            100 -
            0) *
            (100 - 0)) /
          (200 - 0) +
          0
        ).toFixed(0)
      );
      return gamepad?.buttons[Extreme3DPro.reverse_cruise_control_speed].pressed
        ? -throttleSpeed
        : throttleSpeed;
    }

    function getLogitechAngle(): number {
      if (driveCommands.DM === 'S') return 0;
      if (driveCommands.DM === 'T')
        return gamepad?.axes[Extreme3DPro.angle]
          ? parseInt((gamepad?.axes[Extreme3DPro.angle] * 45).toFixed(0))
          : driveCommands.CMD[1];
      return gamepad?.axes[Extreme3DPro.angle]
        ? parseInt((gamepad?.axes[Extreme3DPro.angle] * 12).toFixed(0))
        : driveCommands.CMD[1];
    }

    function getLogitechDriveMode(): string {
      return gamepad?.buttons[Extreme3DPro.spin_mode]?.value
        ? 'S'
        : gamepad?.buttons[Extreme3DPro.translate_mode]?.value
          ? 'T'
          : gamepad?.buttons[Extreme3DPro.drive_mode]?.value
            ? 'D'
            : driveCommands.DM;
    }

    function getLogitechWheelOrientation(): number {
      return gamepad?.buttons[Extreme3DPro.wheel_orientation_0]?.value
        ? 0
        : gamepad?.buttons[Extreme3DPro.wheel_orientation_1]?.value
          ? 1
          : gamepad?.buttons[Extreme3DPro.wheel_orientation_2]?.value
            ? 2
            : driveCommands.WO;
    }

    const gamepadId: string = gamepad?.id.toLowerCase() || '';
    if (gamepadId.includes('extreme 3d') || gamepadId.includes('logitech')) {
      setDriveCommands({
        ...driveCommands,
        WO: getLogitechWheelOrientation(),
        DM: getLogitechDriveMode(),
        CMD: [getLogitechSpeed(), getLogitechAngle()]
      });
      handleSubmit(new Event('submit'));
    }
    if (gamepadId.includes('microsoft') || gamepadId.includes('xbox')) {
      let xbox: XboxDriveControl = new XboxDriveControl(gamepad);
      setDriveCommands(xbox.getCommands());
      handleSubmit(new Event('submit'));
    }
  }, [gamepad, handleSubmit]);

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

