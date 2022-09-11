import { useEffect, useState } from 'react'
import { useGamepads } from 'react-gamepads';
import { DriveFormat } from '../dto/commands';

export default function DriveControl({ roverStatus, setRoverCommands }) {
    useGamepads(gamepads => setGamepads(gamepads));
    const [gamepads, setGamepads] = useState({});
    const [mode, setMode] = useState("D");
    const [speed, setSpeed] = useState("0");
    const [angle, setAngle] = useState("0");
    const [wheelOrientation, setWheelOrientation] = useState("0");
    const [isOperational, setIsOperational] = useState(1);

    async function getGamepadCommands() {
        const newAngle: number = (gamepads[0]?.axes[2]) * 12;
        const newSpeed: number = -(gamepads[0]?.axes[1]) * 100;
        const truncatedAngle = parseInt(newAngle.toFixed(0));
        const truncatedSpeed = parseInt(newSpeed.toFixed(0));

        setAngle(angle);
        setSpeed("0");

        if (gamepads[0]?.buttons[0]?.pressed) {
            setSpeed(truncatedSpeed.toString());
            setAngle(truncatedAngle.toString());
        }
        if (gamepads[0]?.buttons[7]?.value) {
            setMode("D");
        }
        if (gamepads[0]?.buttons[9]?.value) {
            setMode("T");
        }
        if (gamepads[0]?.buttons[11]?.value) {
            setMode("S");
        }
        if (gamepads[0]?.buttons[6]?.value) {
            setWheelOrientation("0");
        }
        if (gamepads[0]?.buttons[8]?.value) {
            setWheelOrientation("1");
        }
        if (gamepads[0]?.buttons[10]?.value) {
            setWheelOrientation("2");
        }
        await setRoverCommands(await createRoverCommand());
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await setRoverCommands(await createRoverCommand());
    }

    function createRoverCommand() {
        const heartbeat_count = roverStatus.heartbeat_count ? roverStatus.heartbeat_count : 0;
        const newCommand: DriveFormat = {
            "heartbeat_count": heartbeat_count,
            "is_operational": isOperational,
            "wheel_orientation": parseInt(wheelOrientation),
            "drive_mode": mode,
            "speed": parseInt(speed),
            "angle": parseInt(angle)
        };
        return newCommand;
    }

    useEffect(() => {
        getGamepadCommands();
    },
        [gamepads[0]]
    )

    return (
        <div className='serial'>
            <h2>Drive Control</h2>
            <form className='serial-form' onSubmit={handleSubmit}>
                <label className='label_lg'> Speed
                    <input autoComplete='false' className='input-text' value={speed} onChange={(e) => setSpeed(e.target.value)} />
                </label>
                <label className='label_lg'> Angle
                    <input autoComplete='false' className='input-text' value={angle} onChange={(e) => setAngle(e.target.value)} />
                </label>
                <label className='label_lg'> Drive Mode
                    <input autoComplete='false' className='input-text' value={mode} onChange={(e) => setMode(e.target.value)} />
                </label>
                <label className='label_lg'> Wheel Orientation
                    <input autoComplete='false' className='input-text' value={wheelOrientation} onChange={(e) => setWheelOrientation(e.target.value)} />
                </label>
                <button className='btn btn__primary btn__lg btn-send' type="submit">Send</button>
            </form>
        </div >
    )
}