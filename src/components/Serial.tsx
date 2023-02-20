import { useEffect, useRef, useState } from 'react'
import { NUMBER_OF_ARM_KEYS, NUMBER_OF_DRIVE_KEYS } from '../util/constants';
import serialParser from '../util/serial-parser';

export default function Serial({ commands, setStatus, system }) {
    let rawSerial: string = "";
    const port = useRef<SerialPort>(undefined);
    const reader = useRef<ReadableStreamDefaultReader>();
    const writer = useRef<WritableStreamDefaultWriter>();
    const [isConnected, setIsConnected] = useState(false);
    const [isDtrModeEnabled, setIsDtrModeEnabled] = useState(false);

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
                setIsDtrModeEnabled(false);
            }
        }
        catch (error) {
            console.error(error);
            setIsConnected(true);
        }
    }

    async function handleReadWrite() {
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

    async function hasRoverStatus() {
        try {
            const numberOfKeys = system === 'drive' ? NUMBER_OF_DRIVE_KEYS : NUMBER_OF_ARM_KEYS;
            const command = serialParser(rawSerial, numberOfKeys);
            if (command !== null) {
                setStatus(command);
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
                await port.current.setSignals({ dataTerminalReady: !isDtrModeEnabled, requestToSend: !isDtrModeEnabled });
                setIsDtrModeEnabled(!isDtrModeEnabled);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleReadWrite();
    }, [isConnected]);

    return (
        <div className='btn-group'>
            {isDtrModeEnabled ? <button className='btn btn__danger' onClick={() => toggleDataTerminalMode()}>Toggle DTR OFF</button>
                : <button className='btn btn__primary' onClick={() => toggleDataTerminalMode()}>Toggle DTR ON</button>}
            {isConnected ? <button className='btn btn__danger' onClick={() => disconnect()}>Disconnect</button>
                : <button className='btn btn__primary' onClick={() => connect()}>Connect</button>}
        </div>
    )
}