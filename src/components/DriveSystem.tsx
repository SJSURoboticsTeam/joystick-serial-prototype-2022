import { useEffect, useState } from 'react';
import { useGamepads } from 'react-gamepads';
import { DriveCommand, DriveCommandStringFormat } from '../dto/commands';
import { DropdownButtonSelector, TextSliderInput, FooterButtons } from './Forms/ControlForm';

import { XboxController } from '../controllers/xbox-360/mapping';
import { Extreme3DPro } from '../controllers/logitech-3d-pro/mapping';

const DEFAULT_DRIVE_COMMANDS: DriveCommand = { HB: 0, IO: 1, DM: 'D', WO: 0, CMD: [0, 0] };
const WHEEL_ORIENTATIONS = [{ label: "0", value: 0 }, { label: "1", value: 1 }, { label: "2", value: 2 }];
const MODES = [{ label: "Spin", value: "S" }, { label: "Translate", value: "T" }, { label: "Drive", value: "D" }];

export default function DriveSystem({ commands }) {
  useGamepads((gamepads) => {
    setGamepads(gamepads[0]);
  });

  const [gamepad, setGamepads] = useState<Gamepad>();
  const [driveCommands, setDriveCommands] = useState<DriveCommand>(DEFAULT_DRIVE_COMMANDS);

  async function handleSubmit(e) {
    e.preventDefault();
    commands.current = DriveCommandStringFormat(driveCommands);
    // console.log("submitting", commands.current);
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
  }, [driveCommands]);

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

    function getXboxSpeed(): number {
      const newSpeed = -parseInt((gamepad?.axes[XboxController.speed] * 10).toFixed(0));
      return newSpeed * 10;
    }

    function getXboxAngle(): number {
      if (driveCommands.DM === 'S') return 0;
      else if (driveCommands.DM === 'T')
        return parseInt(
          (gamepad?.axes[XboxController.angle] * 45).toFixed(0)
        );
      return parseInt(
        (gamepad?.axes[XboxController.angle] * 12).toFixed(0)
      );
    }

    function getXboxDriveMode(): string {
      return gamepad?.buttons[XboxController.spin_mode]?.value
        ? 'S'
        : gamepad?.buttons[XboxController.translate_mode]?.value
          ? 'T'
          : gamepad?.buttons[XboxController.drive_mode]?.value
            ? 'D'
            : driveCommands.DM;
    }

    function getXboxWheelOrientation(): number {
      return gamepad?.buttons[XboxController.wheel_orientation_0]?.value
        ? 0
        : gamepad?.buttons[XboxController.wheel_orientation_1]?.value
          ? 1
          : gamepad?.buttons[XboxController.wheel_orientation_2]?.value
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
      setDriveCommands({
        ...driveCommands,
        WO: getXboxWheelOrientation(),
        DM: getXboxDriveMode(),
        CMD: [getXboxSpeed(), getXboxAngle()]
      });
      handleSubmit(new Event('submit'));
    }
  }, [gamepad]);

  return (
    <div>
      <h2>Drive System</h2>
      <form onSubmit={handleSubmit}>
        <DropdownButtonSelector name='DM' value={driveCommands.DM} onChange={handleChange} options={MODES} />
        <DropdownButtonSelector name='WO' value={driveCommands.WO} onChange={handleChange} options={WHEEL_ORIENTATIONS} />
        <TextSliderInput label='Speed' min={-100} max={100} value={driveCommands.CMD[0]} onChange={(e) => handleCommandChange(e, 0)} handleSubmit={handleSubmit} />
        <TextSliderInput label='Angle' min={driveCommands.DM === "T" ? -45 : -12} max={driveCommands.DM === "T" ? 45 : 12} value={driveCommands.CMD[1]} onChange={(e) => handleCommandChange(e, 1)} handleSubmit={handleSubmit} disabled={driveCommands.DM === 'S'} />
        <FooterButtons onResetClick={() => setDriveCommands(DEFAULT_DRIVE_COMMANDS)} />
      </form>
    </div>
  );
}

