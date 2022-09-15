import { useEffect, useState, useRef } from 'react'
import { useGamepads } from 'react-gamepads';
import { DriveFormat } from '../dto/commands';

export default function DriveControl({ commands }) {
    useGamepads(gamepads => setGamepads(gamepads[0]));
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
        const newWheelOrientation: number = gamepad?.buttons[6]?.value ? 0 : gamepad?.buttons[8]?.value ? 1 : gamepad?.buttons[10]?.value ? 2 : driveCommands.wheel_orientation;
        const newDriveMode: string = gamepad?.buttons[7]?.value ? "D" : gamepad?.buttons[9]?.value ? "T" : gamepad?.buttons[11]?.value ? "S" : driveCommands.drive_mode;
<<<<<<< HEAD
        const newSpeed: number = (gamepad?.axes[1] && gamepad?.buttons[0].pressed) ? parseInt((-(gamepad?.axes[1]) * 100).toFixed(0)) : 0;
        const newAngle: number = gamepad?.axes[0] ? parseInt((gamepad?.axes[0] * 12).toFixed(0)) : driveCommands.angle;
=======
        const newSpeed: number = gamepad?.axes[1] && gamepad?.buttons[0].pressed ? parseInt((-(gamepad?.axes[1]) * 100).toFixed(0)) : 0;
        const newAngle: number = gamepad?.axes[2] ? parseInt((gamepad?.axes[2] * 12).toFixed(0)) : driveCommands.angle;
>>>>>>> 03b3fab7aa4dda030a318be554cd64b05d037375
        setDriveCommands({ ...driveCommands, wheel_orientation: newWheelOrientation, drive_mode: newDriveMode, angle: newAngle, speed: newSpeed });
        handleSubmit(new Event('submit'));
    }, [gamepad]);

    return (
        <div className='serial'>
            <h2>Drive Control</h2>
            <form className='serial-form' onSubmit={handleSubmit}>
                <label className='label_lg'> Drive Mode
                    <input className='input-text' type='text' name='drive_mode' value={driveCommands.drive_mode} onChange={handleChange} />
                </label>
                <label className='label_lg'> Wheel Orientation
                    <input className='input-text' type='number' name='wheel_orientation' value={driveCommands.wheel_orientation} onChange={handleChange} />
                </label>
                <label className='label_lg'> Speed
                    <input className='input-text' type='number' name='speed' value={driveCommands.speed} onChange={handleChange} />
                </label>
                <label className='label_lg'> Angle
                    <input className='input-text' type='number' name='angle' value={driveCommands.angle} onChange={handleChange} />
                </label>
                <button className='btn btn__primary btn__lg btn-send' type="submit">Send</button>
            </form>
        </div >
    )
}