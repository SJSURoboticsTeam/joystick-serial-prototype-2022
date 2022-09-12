import { useEffect, useState, useRef } from 'react'
import { useGamepads } from 'react-gamepads';
import { DriveFormat } from '../dto/commands';

export default function DriveControl({ roverStatus, setRoverCommands }) {
    useGamepads(gamepads => setGamepads(gamepads[0]));
    const [gamepads, setGamepads] = useState<Gamepad>();
    const [driveCommands, setDriveCommands] = useState<DriveFormat>({ heartbeat_count: 0, is_operational: 1, wheel_orientation: 0, drive_mode: "D", speed: 0, angle: 0 });

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(driveCommands);
    }

    function handleChange(e) {
        setDriveCommands({ ...driveCommands, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        const newWheelOrientation: number = gamepads?.buttons[6]?.value ? 0 : gamepads?.buttons[8]?.value ? 1 : gamepads?.buttons[10]?.value ? 2 : driveCommands.wheel_orientation;
        const newDriveMode: string = gamepads?.buttons[7]?.value ? "D" : gamepads?.buttons[9]?.value ? "T" : gamepads?.buttons[11]?.value ? "S" : driveCommands.drive_mode;
        const newSpeed: number = parseInt((-(gamepads?.axes[1]) * 100).toFixed(0));
        const newAngle: number = parseInt(((gamepads?.axes[2]) * 12).toFixed(0));
        setDriveCommands({ ...driveCommands, wheel_orientation: newWheelOrientation, drive_mode: newDriveMode, angle: newAngle, speed: newSpeed });
    }, [gamepads]);

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