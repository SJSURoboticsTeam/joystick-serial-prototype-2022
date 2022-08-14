import React, { useEffect, useState } from 'react'
import { useGamepads } from 'react-gamepads';

export default function DriveControl() {
    const [isConnected, setIsConnected] = useState(false);
    const [ports, setPorts] = useState(navigator.serial.getPorts());
    const [port, setPort] = useState<SerialPort>();
    const [reader, setReader] = useState<ReadableStreamDefaultReader>();
    const [decoder, setDecoder] = useState<TextDecoder>(new TextDecoder("utf-8"));
    const [encoder, setEncoder] = useState<TextEncoder>(new TextEncoder());

    const [gamepads, setGamepads] = useState({});
    useGamepads(gamepads => setGamepads(gamepads));

    const [speed, setSpeed] = useState("0");
    const [angle, setAngle] = useState("0");
    const [mode, setMode] = useState("D");
    const [wheelOrientation, setWheelOrientation] = useState("0");

    const connect = async () => {
        let newPort = await navigator.serial.requestPort();
        await newPort.open({ baudRate: 9600 });
        await newPort.setSignals({ dataTerminalReady: false, requestToSend: false });
        setPort(newPort);
        setIsConnected(true);
    }

    const disconnect = async () => {
        if (reader && reader.cancel) {
            reader.cancel();
        }
        await port.close();
        setIsConnected(false);
    }

    async function readSerial() {
        const textDecoder = new TextDecoderStream();
        const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
        const reader = textDecoder.readable.getReader();

        while (true) {
            const { value, done } = await reader.read();
            if (done) {
                reader.releaseLock();
                break;
            }
            console.log(value);
        }
    }

    async function writeCommands() {
        try {
            const commands = {
                "drive_mode": String(mode),
                "speed": parseInt(speed),
                "angle": parseInt(angle),
                "wheel_orientation": parseInt(wheelOrientation)
            }
            const encoder = new TextEncoder();
            const writer = port.writable.getWriter();
            await writer.write(encoder.encode(JSON.stringify(commands)));
            writer.releaseLock();
            console.log(JSON.stringify(commands));
        } catch (error) {
            console.error("Serial is not connected most likely!");
        }

    }

    useEffect(() => {
        const updateState = async () => {
            const newAngle = (gamepads[0]?.axes[5]) * 45
            const newSpeed = -(gamepads[0]?.axes[1]) * 100
            setSpeed("0");
            setAngle(angle);

            if (gamepads[0].buttons[0].pressed) {
                setSpeed(newSpeed.toString());
                setAngle(newAngle.toString());
            }

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
        [gamepads[0]]
    )

    async function handleSubmit(e) {
        e.preventDefault();
        await writeCommands();
    }

    return (
        <div className='serial'>
            <h2>Drive Control</h2>
            <div className='btn-group'>
                <h3>Serial</h3>
                <button className='btn btn__primary' onClick={() => connect()}>Connect</button>
                <button className='btn' onClick={() => readSerial()}>Read</button>
                <button className='btn' onClick={() => console.log(port)}>Status</button>
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
                    <input autoComplete='false' className='input-text' name="wheel_orientation" value={wheelOrientation} onChange={(e) => setWheelOrientation(e.target.value)} />
                </label>
                <button className='btn btn__primary btn__lg btn-send' type="submit">Send</button>
            </form>
        </div >
    )
}
