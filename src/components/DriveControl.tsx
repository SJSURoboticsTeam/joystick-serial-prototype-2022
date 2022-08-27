import { useEffect, useState } from 'react'
import { useGamepads } from 'react-gamepads';

export default function DriveControl(props) {
    useGamepads(gamepads => setGamepads(gamepads));
    const [gamepads, setGamepads] = useState({});
    const [mode, setMode] = useState("D");
    const [speed, setSpeed] = useState("0");
    const [angle, setAngle] = useState("0");
    const [wheelOrientation, setWheelOrientation] = useState("0");

    async function getGamepadCommands() {
        const newAngle = (gamepads[0]?.axes[2]) * 45
        const newSpeed = -(gamepads[0]?.axes[1]) * 100
        setAngle(angle);
        setSpeed("0");
        if (gamepads[0]?.buttons[0]?.pressed) {
            setSpeed(newSpeed.toString());
            setAngle(newAngle.toString());
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
        await props.setRoverCommands({ speed, angle, mode, wheelOrientation })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await props.setRoverCommands({ speed, angle, mode, wheelOrientation })
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
                    <input autoComplete='false' className='input-text' name="speed" value={speed} onChange={(e) => setSpeed(e.target.value)} />
                </label>
                <label className='label_lg'> Angle
                    <input autoComplete='false' className='input-text' name="angle" value={angle} onChange={(e) => setAngle(e.target.value)} />
                </label>
                <label className='label_lg'> Mode
                    <input autoComplete='false' className='input-text' name="mode" value={mode} onChange={(e) => setMode(e.target.value)} />
                </label>
                <label className='label_lg'> Wheel Orientation
                    <input autoComplete='false' className='input-text' name="wheel_orientation" value={wheelOrientation} onChange={(e) => setWheelOrientation(e.target.value)} />
                </label>
                <button className='btn btn__primary btn__lg btn-send' type="submit">Send</button>
            </form>
        </div >
    )
}