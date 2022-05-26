import React, { useEffect, useState } from 'react'
import { useGamepads } from 'react-gamepads';

export default function Serial() {
    const [port, setPort] = useState<SerialPort>();
    const [gamepads, setGamepads] = useState({});
    useGamepads(gamepads => setGamepads(gamepads));

    const [speed, setSpeed] = useState("0");
    const [angle, setAngle] = useState("0");
    const [mode, setMode] = useState("D");
    const [wheel_orientation, setWheelOrientation] = useState("0");

    const connect = async () => {
        await setPort(await navigator.serial.requestPort());
        await port.open({ baudRate: 9600 });
    }

    const disconnect = async () => {
        await port.close();
    }

    // TODO: Needs to be tested on mcu
    async function writeCommands() {
        try {
            const command = speed + "," + angle + "," + mode + "," + wheel_orientation;
            const encoder = new TextEncoder();
            const writer = port.writable.getWriter();
            await writer.write(encoder.encode(command));
            writer.releaseLock();
        } catch (error) {
            console.error("Serial is not connected most likely!");
        }

    }

    // TODO: This will be annoying most likely
    async function readRoverStatus() {
        return;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await writeCommands();
    }

    useEffect(() => {
        const updateState = async () => {
            setAngle(gamepads[0]?.axes[0]);
            setSpeed(gamepads[0]?.axes[6]);

            if (gamepads[0]?.buttons[7].value) {
                setMode("D");
            }
            if (gamepads[0]?.buttons[9].value) {
                setMode("T");
            }
            if (gamepads[0]?.buttons[11].value) {
                setMode("S");
            }

            if (gamepads[0]?.buttons[6].value) {
                setWheelOrientation("0");
            }
            if (gamepads[0]?.buttons[8].value) {
                setWheelOrientation("1");
            }
            if (gamepads[0]?.buttons[10].value) {
                setWheelOrientation("2");
            }
            await writeCommands();
        }
        updateState();

    },
        [
            gamepads[0]?.axes[1], // left/right joystick movement
            gamepads[0]?.axes[6], // +/- knob
            gamepads[0]?.buttons[11].value, // button marked 10
            gamepads[0]?.buttons[9].value, // button marked 8
            gamepads[0]?.buttons[7].value, // button marked 7
            gamepads[0]?.buttons[6].value, // button marked 6
            gamepads[0]?.buttons[8].value, // button marked 8
            gamepads[0]?.buttons[10].value // button marked 10
        ]
    )

    return (
        <div className='serial'>
            <h2>Serial</h2>
            <div className='btn-group'>
                <button className='btn btn__primary' onClick={() => connect()}>Connect</button>
                <button className='btn' onClick={() => alert(port)}>Status</button>
                <button className='btn btn__danger' onClick={() => disconnect()}>Disconnect</button>
            </div>

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
                    <input autoComplete='false' className='input-text' name="wheel_orientation" value={wheel_orientation} onChange={(e) => setWheelOrientation(e.target.value)} />
                </label>
                <button className='btn btn__primary btn__lg btn-send' type="submit">Send</button>
            </form>

        </div>
    )
}
