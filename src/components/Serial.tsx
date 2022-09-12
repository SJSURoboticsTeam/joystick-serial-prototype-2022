import { useEffect, useRef, useState } from 'react'

export default function Serial({ commands, setStatus }) {
    let serialResponse: string = "";
    const port = useRef<SerialPort>(undefined);
    const reader = useRef<ReadableStreamDefaultReader>();
    const writer = useRef<WritableStreamDefaultWriter>();
    const [isConnected, setIsConnected] = useState(false);
    const [dataTerminalMode, setDataTerminalMode] = useState(false);

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

    function disconnect() {
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
                setDataTerminalMode(false);
            }
        }
        catch (error) {
            console.error(error);
            setIsConnected(true);
        }
    }

    async function toggleDataTerminalMode() {
        try {
            if (port.current) {
                await port.current.setSignals({ dataTerminalReady: !dataTerminalMode, requestToSend: !dataTerminalMode });
                setDataTerminalMode(!dataTerminalMode);
            }
        }
        catch (error) {
            console.error(error);
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
            // parseSerial();
        }
    }

    function parseSerial() {
        let responseArray: string[] = [];
        serialResponse.split("\n").forEach(line => {
            if (line.includes('{') && line.includes('}')) {
                responseArray.push(line);
            }
        })

        let newResponseStatus: string | undefined = responseArray.pop();
        if (newResponseStatus != undefined) {
            if (newResponseStatus.includes("{") && newResponseStatus.includes("}")) {
                console.log("newResponseStatus:", newResponseStatus);
                newResponseStatus = JSON.parse(newResponseStatus);
                setStatus(newResponseStatus);
                serialResponse = "";
            }
        }
    }

    async function writeSerial() {
        try {
            if (isConnected && writer.current) {
                await writer.current.write(new TextEncoder().encode(commands.current + "\n"));
            }
        } catch (error) {
            console.error(error);
            writer.current.abort();
        }
    }

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         writeSerial();
    //     }, 50);
    //     return () => clearInterval(interval);
    // }, [writeSerial]);

    return (
        <>
            {isConnected ? <button className='btn btn__danger' onClick={() => disconnect()}>Disconnect</button> : <button className='btn btn__primary' onClick={() => connect()}>Connect</button>}
            <button className='btn btn__primary' onClick={() => readSerial()}>Read</button>
            <button className='btn btn__primary' onClick={() => writeSerial()}>Write</button>
            {dataTerminalMode ? <button className='btn btn__danger' onClick={() => toggleDataTerminalMode()}>Toggle DTR OFF</button> : <button className='btn btn__primary' onClick={() => toggleDataTerminalMode()}>Toggle DTR ON</button>}
        </>
    )
}