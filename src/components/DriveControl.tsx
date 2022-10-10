import { useEffect, useState } from 'react'
import { useGamepads } from 'react-gamepads';
import { DriveFormat } from '../dto/commands';
import { XboxController } from '../dto/gamepad';

export default function DriveControl({ commands }) {
    useGamepads(gamepads => { setGamepads(gamepads[0]) }); // will use the first gamepad connected

    const [gamepad, setGamepads] = useState<Gamepad>();
    const [driveCommands, setDriveCommands] = useState<DriveFormat>({ heartbeat_count: 0, is_operational: 1, wheel_orientation: 0, drive_mode: "D", speed: 0, angle: 0 });

    async function handleSubmit(e) {
        e.preventDefault();
        commands.current = `{"heartbeat_count":${driveCommands.heartbeat_count},"is_operational":${driveCommands.is_operational},"wheel_orientation":${driveCommands.wheel_orientation},"drive_mode":"${driveCommands.drive_mode}","speed":${driveCommands.speed},"angle":${driveCommands.angle}}`;
    }

    function handleChange(e) {
        setDriveCommands({ ...driveCommands, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        let gamepadId = gamepad?.id.toLowerCase();
        if (gamepadId.includes("extreme 3d") || gamepadId.includes("logitech")) {
            const newWheelOrientation: number = gamepad?.buttons[6]?.value ? 0 : gamepad?.buttons[8]?.value ? 1 : gamepad?.buttons[10]?.value ? 2 : driveCommands.wheel_orientation;
            const newDriveMode: string = gamepad?.buttons[7]?.value ? "D" : gamepad?.buttons[9]?.value ? "T" : gamepad?.buttons[11]?.value ? "S" : driveCommands.drive_mode;
            const newSpeed: number = gamepad?.buttons[1].pressed ? driveCommands.speed : (gamepad?.axes[1] && gamepad?.buttons[0].pressed) ? parseInt((-(gamepad?.axes[1]) * 100).toFixed(0)) : 0;
            const newAngle: number = gamepad?.axes[0] ? parseInt((gamepad?.axes[0] * 12).toFixed(0)) : driveCommands.angle;
            setDriveCommands({ ...driveCommands, wheel_orientation: newWheelOrientation, drive_mode: newDriveMode, angle: newAngle, speed: newSpeed });
            handleSubmit(new Event('submit'));
        }
        if (gamepadId.includes("microsoft") || gamepadId.includes("xbox")) {
            const newWheelOrientation: number =
                gamepad?.buttons[XboxController.left_dpad]?.value ? 0
                    : gamepad?.buttons[XboxController.up_dpad]?.value ? 1
                        : gamepad?.buttons[XboxController.right_dpad]?.value ? 2
                            : driveCommands.wheel_orientation;

            const newDriveMode: string =
                gamepad?.buttons[XboxController.y]?.value ? "D"
                    : gamepad?.buttons[XboxController.x]?.value ? "T"
                        : gamepad?.buttons[XboxController.b]?.value ? "S"
                            : driveCommands.drive_mode;

            const forwardSpeed: number = (gamepad?.buttons[XboxController.right_trigger]?.value) ? parseInt((-(gamepad?.buttons[XboxController.right_trigger]?.value) * -100).toFixed(0)) : 0;

            const reverseSpeed: number = (gamepad?.buttons[XboxController.left_trigger]?.value) ? parseInt((-(gamepad?.buttons[XboxController.left_trigger]?.value) * 100).toFixed(0)) : 0;

            const newAngle: number = gamepad?.axes[XboxController.left_analog_x] ? parseInt((gamepad?.axes[XboxController.left_analog_x] * 12).toFixed(0)) : driveCommands.angle;

            setDriveCommands({ ...driveCommands, wheel_orientation: newWheelOrientation, drive_mode: newDriveMode, angle: newAngle, speed: (forwardSpeed + reverseSpeed) });
            handleSubmit(new Event('submit'));
        }
    }, [gamepad]);

    useEffect(() => {
        handleSubmit(new Event('submit'));
    }, []);

    return (
        <div className='serial'>
            <h2>Drive Control</h2>
            <form className='serial-form' onSubmit={handleSubmit}>

                <label className='label_lg'> Drive Mode</label>
                <div className='btn-group'>
                    <select className='input-text' name='drive_mode' value={driveCommands.drive_mode} onChange={handleChange}>
                        <option value="D">Drive</option>
                        <option value="S">Spin</option>
                        <option value="T">Translate</option>
                    </select>
                    <button className='btn btn__primary' onClick={() => setDriveCommands({ ...driveCommands, drive_mode: "D" })}>Drive</button>
                    <button className='btn btn__primary' onClick={() => setDriveCommands({ ...driveCommands, drive_mode: "S" })}>Spin</button>
                    <button className='btn btn__primary' onClick={() => setDriveCommands({ ...driveCommands, drive_mode: "T" })}>Translate</button>
                </div>

                <label className='label_lg'> Wheel Orientation</label>
                <div className='btn-group'>
                    <select className='input-text' name='wheel_orientation' value={driveCommands.wheel_orientation} onChange={handleChange}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                    <button className='btn btn__primary' onClick={() => setDriveCommands({ ...driveCommands, wheel_orientation: 0 })}>0</button>
                    <button className='btn btn__primary' onClick={() => setDriveCommands({ ...driveCommands, wheel_orientation: 1 })}>1</button>
                    <button className='btn btn__primary' onClick={() => setDriveCommands({ ...driveCommands, wheel_orientation: 2 })}>2</button>
                </div>

                <div className='btn-group'>
                    <label className='label_lg'> Speed
                        <input autoComplete='off' className='input-text' type='number' name='speed' max={100} min={-100} value={driveCommands.speed} onChange={handleChange} />
                    </label>
                    <input className='slider' type='range' name='speed' max={100} min={-100} value={driveCommands.speed} onChange={handleChange} />
                </div>
                {driveCommands.drive_mode === "S" ?
                    <>
                        <div className='btn-group'>
                            <label className='label_lg'> Angle
                                <input autoComplete='off' disabled className='input-text' type='number' name='angle' value={driveCommands.angle} onChange={handleChange} />
                            </label>
                            <input className='slider' disabled type='range' name='angle' max={12} min={-12} value={driveCommands.angle} onChange={handleChange} />
                        </div>
                    </>
                    :
                    <>
                        <div className='btn-group'>
                            <label className='label_lg'> Angle
                                <input autoComplete='off' className='input-text' type='number' name='angle' value={driveCommands.angle} onChange={handleChange} />
                            </label>
                            <input className='slider' type='range' name='angle' max={12} min={-12} value={driveCommands.angle} onChange={handleChange} />
                        </div>
                    </>
                }


                <button className='btn btn__primary btn__lg btn-send' type="submit">Send</button>
            </form>
        </div >
    )
}