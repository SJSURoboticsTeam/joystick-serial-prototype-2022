import { useEffect, useState } from 'react';
import { useGamepads } from 'react-gamepads';
import { DriveFormat } from '../dto/commands';
import { XboxController } from '../dto/gamepad';
import { Extreme3DPro } from '../dto/gamepad';

export default function DriveControl({ commands }) {
  useGamepads((gamepads) => {
    setGamepads(gamepads[0]);
  }); // will use the first gamepad connected

  const [gamepad, setGamepads] = useState<Gamepad>();
  const [driveCommands, setDriveCommands] = useState<DriveFormat>({
    heartbeat_count: 0,
    is_operational: 1,
    wheel_orientation: 0,
    drive_mode: 'D',
    speed: 0,
    angle: 0,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    commands.current = `{"heartbeat_count":${driveCommands.heartbeat_count},"is_operational":${driveCommands.is_operational},"wheel_orientation":${driveCommands.wheel_orientation},"drive_mode":"${driveCommands.drive_mode}","speed":${driveCommands.speed},"angle":${driveCommands.angle}}`;
  }

  function handleChange(e) {
    setDriveCommands({ ...driveCommands, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    function getLogitechSpeed(): number {
      if (gamepad?.buttons[Extreme3DPro.trigger].pressed) {
        return parseInt(
          (-gamepad?.axes[Extreme3DPro.joystick_y] * 100).toFixed(0)
        );
      }
      const throttleSpeed = parseInt(
        (
          ((parseInt((-gamepad?.axes[Extreme3DPro.throttle] * 100).toFixed(0)) +
            100 -
            0) *
            (100 - 0)) /
            (200 - 0) +
          0
        ).toFixed(0)
      );
      return gamepad?.buttons[Extreme3DPro.thumb_btn].pressed
        ? -throttleSpeed
        : throttleSpeed;
    }

    function getLogitechAngle(): number {
      if (driveCommands.drive_mode === 'S') return 0;
      if (driveCommands.drive_mode === 'T')
        return gamepad?.axes[Extreme3DPro.joystick_x]
          ? parseInt((gamepad?.axes[Extreme3DPro.joystick_x] * 45).toFixed(0))
          : driveCommands.angle;
      return gamepad?.axes[Extreme3DPro.joystick_x]
        ? parseInt((gamepad?.axes[Extreme3DPro.joystick_x] * 12).toFixed(0))
        : driveCommands.angle;
    }

    function getLogitechDriveMode(): string {
      return gamepad?.buttons[Extreme3DPro.btn_8]?.value
        ? 'S'
        : gamepad?.buttons[Extreme3DPro.btn_10]?.value
        ? 'T'
        : gamepad?.buttons[Extreme3DPro.btn_12]?.value
        ? 'D'
        : driveCommands.drive_mode;
    }

    function getLogitechWheelOrientation(): number {
      return gamepad?.buttons[Extreme3DPro.btn_7]?.value
        ? 0
        : gamepad?.buttons[Extreme3DPro.btn_9]?.value
        ? 1
        : gamepad?.buttons[Extreme3DPro.btn_11]?.value
        ? 2
        : driveCommands.wheel_orientation;
    }

    function getXboxSpeed(): number {
      return parseInt(
        (-gamepad?.axes[XboxController.left_analog_y] * 100).toFixed(0)
      );
    }

    function getXboxAngle(): number {
      if (driveCommands.drive_mode === 'S') return 0;
      else if (driveCommands.drive_mode === 'T')
        return parseInt(
          (gamepad?.axes[XboxController.right_analog_x] * 45).toFixed(0)
        );
      return parseInt(
        (gamepad?.axes[XboxController.right_analog_x] * 12).toFixed(0)
      );
    }

    function getXboxDriveMode(): string {
      return gamepad?.buttons[XboxController.x]?.value
        ? 'S'
        : gamepad?.buttons[XboxController.y]?.value
        ? 'T'
        : gamepad?.buttons[XboxController.b]?.value
        ? 'D'
        : driveCommands.drive_mode;
    }

    function getXboxWheelOrientation(): number {
      return gamepad?.buttons[XboxController.dpad_left]?.value
        ? 0
        : gamepad?.buttons[XboxController.dpad_up]?.value
        ? 1
        : gamepad?.buttons[XboxController.dpad_right]?.value
        ? 2
        : driveCommands.wheel_orientation;
    }

    const gamepadId: string = gamepad?.id.toLowerCase() || '';
    if (gamepadId.includes('extreme 3d') || gamepadId.includes('logitech')) {
      setDriveCommands({
        ...driveCommands,
        wheel_orientation: getLogitechWheelOrientation(),
        drive_mode: getLogitechDriveMode(),
        angle: getLogitechAngle(),
        speed: getLogitechSpeed(),
      });
      handleSubmit(new Event('submit'));
    }
    if (gamepadId.includes('microsoft') || gamepadId.includes('xbox')) {
      setDriveCommands({
        ...driveCommands,
        wheel_orientation: getXboxWheelOrientation(),
        drive_mode: getXboxDriveMode(),
        angle: getXboxAngle(),
        speed: getXboxSpeed(),
      });
      handleSubmit(new Event('submit'));
    }
  }, [gamepad]);

  useEffect(() => {
    handleSubmit(new Event('submit'));
  }, []);

  const SpinModeView = (
    <div className='btn-group'>
      <label className='label_lg'>
        {' '}
        Angle
        <input
          autoComplete='off'
          disabled
          className='input-text'
          type='number'
          name='angle'
          value={driveCommands.angle}
          onChange={handleChange}
        />
      </label>
      <input
        className='slider'
        disabled
        type='range'
        name='angle'
        max={12}
        min={-12}
        value={driveCommands.angle}
        onChange={handleChange}
      />
    </div>
  );

  const DriveTranslateModeView = (
    <>
      <div className='btn-group'>
        <label className='label_lg'>
          {' '}
          Angle
          <input
            autoComplete='off'
            className='input-text'
            type='number'
            name='angle'
            value={driveCommands.angle}
            onChange={handleChange}
          />
        </label>
        <input
          className='slider'
          type='range'
          name='angle'
          max={driveCommands.drive_mode === 'T' ? 45 : 12}
          min={driveCommands.drive_mode === 'T' ? -45 : -12}
          value={driveCommands.angle}
          onChange={handleChange}
        />
      </div>
    </>
  );

  return (
    <div className='serial'>
      <h2>Drive Control</h2>
      <form className='serial-form' onSubmit={handleSubmit}>
        <label className='label_lg'>Drive Mode</label>
        <div className='btn-group'>
          <select
            className='input-text'
            name='drive_mode'
            value={driveCommands.drive_mode}
            onChange={handleChange}
          >
            <option value='D'>Drive</option>
            <option value='S'>Spin</option>
            <option value='T'>Translate</option>
          </select>
          <button
            className='btn btn__primary'
            onClick={() =>
              setDriveCommands({ ...driveCommands, drive_mode: 'D' })
            }
          >
            Drive
          </button>
          <button
            className='btn btn__primary'
            onClick={() =>
              setDriveCommands({ ...driveCommands, drive_mode: 'S' })
            }
          >
            Spin
          </button>
          <button
            className='btn btn__primary'
            onClick={() =>
              setDriveCommands({ ...driveCommands, drive_mode: 'T' })
            }
          >
            Translate
          </button>
        </div>

        <label className='label_lg'> Wheel Orientation</label>
        <div className='btn-group'>
          <select
            className='input-text'
            name='wheel_orientation'
            value={driveCommands.wheel_orientation}
            onChange={handleChange}
          >
            <option value='0'>0</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
          </select>
          <button
            className='btn btn__primary'
            onClick={() =>
              setDriveCommands({ ...driveCommands, wheel_orientation: 0 })
            }
          >
            0
          </button>
          <button
            className='btn btn__primary'
            onClick={() =>
              setDriveCommands({ ...driveCommands, wheel_orientation: 1 })
            }
          >
            1
          </button>
          <button
            className='btn btn__primary'
            onClick={() =>
              setDriveCommands({ ...driveCommands, wheel_orientation: 2 })
            }
          >
            2
          </button>
        </div>

        <div className='btn-group'>
          <label className='label_lg'>
            {' '}
            Speed
            <input
              autoComplete='off'
              className='input-text'
              type='number'
              name='speed'
              max={100}
              min={-100}
              value={driveCommands.speed}
              onChange={handleChange}
            />
          </label>
          <input
            className='slider'
            type='range'
            name='speed'
            max={100}
            min={-100}
            value={driveCommands.speed}
            onChange={handleChange}
          />
        </div>
        {driveCommands.drive_mode === 'S' && SpinModeView}
        {(driveCommands.drive_mode === 'D' ||
          driveCommands.drive_mode === 'T') &&
          DriveTranslateModeView}
        <button className='btn btn__primary btn__lg btn-send' type='submit'>
          Send
        </button>
      </form>
    </div>
  );
}
