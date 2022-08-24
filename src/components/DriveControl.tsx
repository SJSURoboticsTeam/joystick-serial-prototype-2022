import React, { useEffect, useState } from 'react'
import { useGamepads } from 'react-gamepads';
import { setTimeout } from 'timers/promises';
import Terminal from './Terminal';

export default function DriveControl(props) {
    let serialStream = "";
    const [isConnected, setIsConnected] = useState(false);
    const [port, setPort] = useState<SerialPort>();
    const [decoder, setDecoder] = useState<TextDecoder>(new TextDecoder("utf-8"));
    const [encoder, setEncoder] = useState<TextEncoder>(new TextEncoder());
    const [reader, setReader] = useState<ReadableStreamDefaultReader>();
    const [writer, setWriter] = useState<WritableStreamDefaultWriter>();
    const [timeExpired, setTimeExpired] = useState(false)

    const [gamepads, setGamepads] = useState({});
    useGamepads(gamepads => setGamepads(gamepads));

    const [speed, setSpeed] = useState("0");
    const [angle, setAngle] = useState("0");
    const [mode, setMode] = useState("D");
    const [wheelOrientation, setWheelOrientation] = useState("0");

    const connect = async () => {
        let newPort = await navigator.serial.requestPort();
        await newPort.open({ baudRate: 38400 });
        await newPort.setSignals({ dataTerminalReady: false, requestToSend: false });
        // setDecoder(new TextDecoder("utf-8"))
        // setEncoder(new TextEncoder());
        setReader(newPort.readable.getReader())
        setWriter(newPort.writable.getWriter())
        // setReadableStreamClosed(newPort.readable.pipeTo(decoder))
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
        while (true) {
            const { value, done } = await reader.read();
            if (done) {
                break;
            }

            let decoded = await new TextDecoder().decode(value);
            serialStream += await decoded;
            console.log("output: ", serialStream);
            if (serialStream.includes("{") && serialStream.includes("}")) {
                serialStream = JSON.parse(serialStream);
                console.log("Parsed JSON: ", serialStream);
                props.setRoverStatus(serialStream);
                serialStream = "";
            }
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
            if (writer && port) {
                await writer.write(encoder.encode(JSON.stringify(commands)));
                console.log('Wrote: ', JSON.stringify(commands));
            }
        } catch (error) {
            console.error("Serial is not connected most likely!");
        }

    }

    useEffect(() => {
        const test = setInterval(writeSerial, 2000);
        return () => clearInterval(test);
    }, []);

    useEffect(() => {
        const updateState = async () => {
            const newAngle = (gamepads[0]?.axes[5]) * 45
            const newSpeed = -(gamepads[0]?.axes[1]) * 100
            setSpeed("0");
            setAngle(angle);

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
