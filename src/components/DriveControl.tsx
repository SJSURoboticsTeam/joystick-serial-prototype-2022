import React, { useEffect, useState } from 'react'
import { useGamepads } from 'react-gamepads';

export default function DriveControl() {
    const [isConnected, setIsConnected] = useState(false);
    const [ports, setPorts] = useState(navigator.serial.getPorts());
    const [port, setPort] = useState<SerialPort>();
    const [decoder, setDecoder] = useState<TextDecoder>(new TextDecoder("utf-8"));
    const [encoder, setEncoder] = useState<TextEncoder>(new TextEncoder());
    const [reader, setReader] = useState<ReadableStreamDefaultReader>();
    const [writer, setWriter] = useState<WritableStreamDefaultWriter>();

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
        setReader(newPort.readable.getReader())
        setWriter(newPort.writable.getWriter())
        setPort(newPort);
        setIsConnected(true);
    }

    const disconnect = async () => {
        if (reader && reader.cancel) {
            reader.releaseLock();
            reader.cancel();
        }
        await port.close();
        setIsConnected(false);
    }

    async function readSerial() {
        try {
            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    break;
                }
                let decoded = decoder.decode(value);
                decoded = decoded.replace(/\n/g, "\r\n");
                console.log(decoded);
            }
        } catch (error) {
            disconnect();
        } finally {
            // TODO: Figure out how to properly close reader, this doesn't work...
            let closeReader = reader;
            closeReader.cancel();
            closeReader.releaseLock();
            setReader(closeReader);
        }
    }

    async function writeSerial() {
        try {
            const commands = {
                "drive_mode": String(mode),
                "speed": parseInt(speed),
                "angle": parseInt(angle),
                "wheel_orientation": parseInt(wheelOrientation)
            }
            console.log(encoder);
            if (writer) {
                await writer.write(encoder.encode(JSON.stringify(commands)));
            }
            // writer.releaseLock();
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
            await writeSerial();
        }
        updateState();

    },
        [gamepads[0]]
    )

    async function handleSubmit(e) {
        e.preventDefault();
        await writeSerial();
    }

    return (
        <div className='serial'>
            <h2>Drive Control</h2>
            <div className='btn-group'>
                <h3>Serial</h3>
                <button className='btn btn__primary' onClick={() => connect()}>Connect</button>
                <button className='btn' onClick={() => readSerial()}>Read</button>
                <button className='btn' onClick={() => writeSerial()}>Write</button>
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
