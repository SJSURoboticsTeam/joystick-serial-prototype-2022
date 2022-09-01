import { useEffect, useRef, useState } from 'react'

export default function Serial({ roverCommands, setRoverStatus }) {
    let serialResponse = "";
    const port = useRef<SerialPort>(undefined);
    const reader = useRef<ReadableStreamDefaultReader>();
    const writer = useRef<WritableStreamDefaultWriter>();
    const [isConnected, setIsConnected] = useState(false);

    async function connect() {
        port.current = await navigator.serial.requestPort();
        await port.current.open({ baudRate: 9600 });
        await port.current.setSignals({ dataTerminalReady: false, requestToSend: false });
        reader.current = port.current.readable.getReader();
        writer.current = port.current.writable.getWriter();
        setIsConnected(true);
    }

    async function disconnect() {
        if (reader.current) {
            reader.current.cancel();
            writer.current.abort();
            reader.current.releaseLock();
            writer.current.releaseLock();
            port.current.close();
            port.current = undefined;
            reader.current = undefined;
            writer.current = undefined;
        }
        setIsConnected(false);
    }

    async function readSerial() {
        while (isConnected) {
            const { value, done } = await reader.current.read();
            if (done) {
                break;
            }
            let decoded = await new TextDecoder().decode(value);
            serialResponse += await decoded;
            parseSerial();
        }
    }

    function parseSerial() {
        let responseArray: string[] = [];
        serialResponse.split("\n").forEach(line => {
            if (line.includes('{') && line.includes('}')) {
                responseArray.push(line);
            }
        })

        let newCommand: string | undefined = responseArray.pop();
        if (newCommand != undefined) {
            if (newCommand.includes("{") && newCommand.includes("}")) {
                console.log("newCommand:", newCommand);
                newCommand = JSON.parse(newCommand);
                setRoverStatus(newCommand);
                serialResponse = "";
            }
        }
    }

    async function writeSerial() {
        const newCommandString = JSON.stringify({
            "drive_mode": String(roverCommands.mode),
            "speed": parseInt(roverCommands.speed),
            "angle": parseInt(roverCommands.angle),
            "wheel_orientation": parseInt(roverCommands.wheelOrientation)
        });
        try {
            if (isConnected && writer.current) {
                await writer.current.write(new TextEncoder().encode(newCommandString));
            }
        } catch (error) {
            writer.current.abort();
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            writeSerial();
        }, 50);
        return () => clearInterval(interval);
    }, [roverCommands]); // does this need to be here?

    return (
        <>
            {isConnected ? <button className='btn btn__danger' onClick={() => disconnect()}>Disconnect</button> : <button className='btn btn__primary' onClick={() => connect()}>Connect</button>}
            <button className='btn' onClick={() => readSerial()}>Read</button>
            <button className='btn' onClick={() => writeSerial()}>Write</button>
            <button className='btn' onClick={() => console.log(port, reader, writer)}>Status</button>
        </>
    )
}