import { useEffect, useRef, useState } from 'react'
import { DriveFormat, ArmFormat } from '../dto/commands'

export default function Serial({ commands, setStatus, isDriveControl }) {
    let rawSerial: string = "";
    const port = useRef<SerialPort>(undefined);
    const reader = useRef<ReadableStreamDefaultReader>();
    const writer = useRef<WritableStreamDefaultWriter>();
    const [isConnected, setIsConnected] = useState(false);
    const [dataTerminalMode, setDataTerminalMode] = useState(false);
    const [armSerialMode, setArmSerialMode] = useState(false)

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

    async function handleDriveSerialRead() {
        while (isConnected) {
            const { value } = await reader.current.read();
            let decoded = await new TextDecoder().decode(value);
            rawSerial += await decoded;
            console.log(decoded);
            if (hasRoverStatus()) {
                await writeSerial();
            }
        }
    }

    async function handleArmSerialRead() {
        while (isConnected) {
            const { value } = await reader.current.read();
            let decoded = await new TextDecoder().decode(value);
            rawSerial += await decoded;
            console.log(decoded);
            if (hasRoverStatus()) {
                break;
            }
        }
    }

    async function writeSerial() {
        try {
            if (isConnected && writer.current) {
                // console.log("writing", commands.current);
                await writer.current.write(new TextEncoder().encode(commands.current + "\n"));
            }
        } catch (error) {
            console.error(error);
            writer.current.abort();
        }
    }

    async function hasRoverStatus() {
        try {
            let responseArray: string[] = [];
            rawSerial.split("\n").forEach(line => {
                if (line.indexOf("{") < line.indexOf("}")) {
                    line = line.substring(line.indexOf("{"), line.indexOf("}") + 1);
                    responseArray.push(line);
                }
            })

            let newStatus: string | undefined;
            newStatus = responseArray.pop() as string;
            if (newStatus != undefined) {
                newStatus = JSON.parse(newStatus);
                setStatus(newStatus);
                return true;
            }
            return false;
        } catch (error) {
            return false;
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

    useEffect(() => {
        handleDriveSerialRead();
    }, [isConnected]);

    return (
        <>
            {dataTerminalMode ? <button className='btn btn__danger' onClick={() => toggleDataTerminalMode()}>Toggle DTR OFF</button> : <button className='btn btn__primary' onClick={() => toggleDataTerminalMode()}>Toggle DTR ON</button>}
            {isConnected ? <button className='btn btn__danger' onClick={() => disconnect()}>Disconnect</button> : <button className='btn btn__primary' onClick={() => connect()}>Connect</button>}
        </>
    )
}