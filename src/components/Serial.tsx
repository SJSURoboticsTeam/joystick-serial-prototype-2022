import { useEffect, useRef, useState } from 'react'

export default function Serial({ roverCommands, setRoverStatus }) {
    let serialResponse = "";
    const port = useRef<SerialPort>(undefined);
    const reader = useRef<ReadableStreamDefaultReader>();
    const writer = useRef<WritableStreamDefaultWriter>();
    const [isConnected, setIsConnected] = useState(false);

    async function connect() {
        try {
            port.current = await navigator.serial.requestPort();
            await port.current.open({ baudRate: 38400 });
            await port.current.setSignals({ dataTerminalReady: false, requestToSend: false });
            reader.current = port.current.readable.getReader();
            writer.current = port.current.writable.getWriter();
            setIsConnected(true);
        } catch (error) {
            console.error(error);
            setIsConnected(false);
        }
    }

    async function disconnect() {
        try {
            if (reader.current) {
                reader.current.cancel();
                writer.current.abort();
                reader.current.releaseLock();
                writer.current.releaseLock();
                port.current.close();
                port.current = undefined;
                reader.current = undefined;
                writer.current = undefined;
                setIsConnected(false);
            }
        }
        catch (error) {
            console.error(error);
            setIsConnected(true);
        }

    }

    async function readSerial() {
        while (isConnected) {
            const { value, done } = await reader.current.read();
            if (done) {
                break;
            }
            let decoded = await new TextDecoder().decode(value);
            serialResponse += await decoded;
            console.log(decoded);
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
        try {
            if (isConnected && writer.current) {
                await writer.current.write(new TextEncoder().encode(JSON.stringify(roverCommands)));
                console.log(roverCommands);
            }
        } catch (error) {
            console.error(error);
            writer.current.abort();
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            writeSerial();
        }, 50);
        return () => clearInterval(interval);
    }, [writeSerial]);

    return (
        <>
            {isConnected ? <button className='btn btn__danger' onClick={() => disconnect()}>Disconnect</button> : <button className='btn btn__primary' onClick={() => connect()}>Connect</button>}
            <button className='btn' onClick={() => readSerial()}>Read</button>
            <button className='btn' onClick={() => writeSerial()}>Write</button>
            <button className='btn' onClick={() => console.log(port, reader, writer)}>Status</button>
        </>
    )
}