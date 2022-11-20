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
    HB: 0,
    IO: 1,
    WO: 0,
    DM: 'D',
    CMD: [0,0]
  });

  async function handleSubmit(e) {
    e.preventDefault();
    commands.current = `{"HB":${driveCommands.HB},"IO":${driveCommands.IO},"WO":${driveCommands.WO},"DM":"${driveCommands.DM}","CMD":[${driveCommands.CMD}]}`;
  }

  function handleChange(e) {
    setDriveCommands({ ...driveCommands, [e.target.name]: e.target.value });
  }

  function handleCMDChange(e, index) {
    const newArray = [...driveCommands.CMD];
    newArray[index] = e.target.value;
    setDriveCommands({ ...driveCommands, CMD: newArray });
}

  useEffect(() => {
    function getLogitechSpeed(): number {
      if (gamepad?.buttons[Extreme3DPro.trigger].pressed) {
        return parseInt(
          (-gamepad?.axes[Extreme3DPro.pitch] * 100).toFixed(0)
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
      if (driveCommands.DM === 'S') return 0;
      if (driveCommands.DM === 'T')
        return gamepad?.axes[Extreme3DPro.yaw]
          ? parseInt((gamepad?.axes[Extreme3DPro.yaw] * 45).toFixed(0))
          : driveCommands.CMD[1];
      return gamepad?.axes[Extreme3DPro.yaw]
        ? parseInt((gamepad?.axes[Extreme3DPro.yaw] * 12).toFixed(0))
        : driveCommands.CMD[1];
    }

    function getLogitechDriveMode(): string {
      return gamepad?.buttons[Extreme3DPro.btn_8]?.value
        ? 'S'
        : gamepad?.buttons[Extreme3DPro.btn_10]?.value
        ? 'T'
        : gamepad?.buttons[Extreme3DPro.btn_12]?.value
        ? 'D'
        : driveCommands.DM;
    }

    function getLogitechWheelOrientation(): number {
      return gamepad?.buttons[Extreme3DPro.btn_7]?.value
        ? 0
        : gamepad?.buttons[Extreme3DPro.btn_9]?.value
        ? 1
        : gamepad?.buttons[Extreme3DPro.btn_11]?.value
        ? 2
        : driveCommands.WO;
    }

    function getXboxSpeed(): number {
      return parseInt(
        (-gamepad?.axes[XboxController.left_analog_y] * 100).toFixed(0)
      );
    }

    function getXboxAngle(): number {
      if (driveCommands.DM === 'S') return 0;
      else if (driveCommands.DM === 'T')
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
        : driveCommands.DM;
    }

    function getXboxWheelOrientation(): number {
      return gamepad?.buttons[XboxController.dpad_left]?.value
        ? 0
        : gamepad?.buttons[XboxController.dpad_up]?.value
        ? 1
        : gamepad?.buttons[XboxController.dpad_right]?.value
        ? 2
        : driveCommands.WO;
    }

    const gamepadId: string = gamepad?.id.toLowerCase() || '';
    if (gamepadId.includes('extreme 3d') || gamepadId.includes('logitech')) {
      setDriveCommands({
        ...driveCommands,
        WO: getLogitechWheelOrientation(),
        DM: getLogitechDriveMode(),
        CMD: [getLogitechSpeed(),getLogitechAngle()]
      });
      handleSubmit(new Event('submit'));
    }
    if (gamepadId.includes('microsoft') || gamepadId.includes('xbox')) {
      setDriveCommands({
        ...driveCommands,
        WO: getXboxWheelOrientation(),
        DM: getXboxDriveMode(),
        CMD: [getXboxSpeed(),getXboxAngle()]
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
          value={driveCommands.CMD[1]}
          onChange={(e) => handleCMDChange(e, 1)}
        />
      </label>
      <input
        className='slider'
        disabled
        type='range'
        name='angle'
        max={12}
        min={-12}
        value={driveCommands.CMD[1]}
        onChange={(e) => handleCMDChange(e, 1)}
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
            value={driveCommands.CMD[1]}
            onChange={(e) => handleCMDChange(e, 1)}
          />
        </label>
        <input
          className='slider'
          type='range'
          name='angle'
          max={driveCommands.DM === 'T' ? 45 : 12}
          min={driveCommands.DM === 'T' ? -45 : -12}
          value={driveCommands.CMD[1]}
          onChange={(e) => handleCMDChange(e, 1)}
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
            value={driveCommands.DM}
            onChange={handleChange}
          >
            <option value='D'>Drive</option>
            <option value='S'>Spin</option>
            <option value='T'>Translate</option>
          </select>
          <button
            className='btn btn__primary'
            onClick={() =>
              setDriveCommands({ ...driveCommands, DM: 'D' })
            }
          >
            Drive
          </button>
          <button
            className='btn btn__primary'
            onClick={() =>
              setDriveCommands({ ...driveCommands, DM: 'S' })
            }
          >
            Spin
          </button>
          <button
            className='btn btn__primary'
            onClick={() =>
              setDriveCommands({ ...driveCommands, DM: 'T' })
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
            value={driveCommands.WO}
            onChange={handleChange}
          >
            <option value='0'>0</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
          </select>
          <button
            className='btn btn__primary'
            onClick={() =>
              setDriveCommands({ ...driveCommands, WO: 0 })
            }
          >
            0
          </button>
          <button
            className='btn btn__primary'
            onClick={() =>
              setDriveCommands({ ...driveCommands, WO: 1 })
            }
          >
            1
          </button>
          <button
            className='btn btn__primary'
            onClick={() =>
              setDriveCommands({ ...driveCommands, WO: 2 })
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
              value={driveCommands.CMD[0]}
              onChange={(e) => handleCMDChange(e, 0)}
            />
          </label>
          <input
            className='slider'
            type='range'
            name='speed'
            max={100}
            min={-100}
            value={driveCommands.CMD[0]}
            onChange={(e) => handleCMDChange(e, 0)}
          />
        </div>
        {driveCommands.DM === 'S' && SpinModeView}
        {(driveCommands.DM === 'D' ||
          driveCommands.DM === 'T') &&
          DriveTranslateModeView}
        <button className='btn btn__primary btn__lg btn-send' type='submit'>
          Send
        </button>
      </form>
    </div>
  );
}
