import { useEffect, useRef, useState } from 'react'
import { NUMBER_OF_ARM_KEYS, NUMBER_OF_DRIVE_KEYS } from '../util/constants';
import serialParser from '../util/serial-parser';
import axios from 'axios'

export default function SerialWifi({ setStatus }) {
    let rawSerial: string = "";
    const port = useRef<SerialPort>(undefined);
    const reader = useRef<ReadableStreamDefaultReader>();
    const writer = useRef<WritableStreamDefaultWriter>();
    const [isConnected, setIsConnected] = useState(false);
    const [isDtrModeEnabled, setIsDtrModeEnabled] = useState(false);
    const [serverAddress, setServerAddress] = useState('http://localhost:5000/arm');

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
            const command = serialParser(rawSerial, NUMBER_OF_ARM_KEYS);
            if (command !== null) {
                rawSerial = "";
                console.log(command);
                await axios.post(serverAddress, command);
            }
            try {
                let response = await axios.get(serverAddress + "/status");
                setStatus(response.data);
            }
            catch (error) {
                disconnect();
                setStatus({
                    message: error.message,
                    url: error.config.url,
                });
            }
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
        <>
            {isDtrModeEnabled ? <button className='btn btn__danger' onClick={() => toggleDataTerminalMode()}>Toggle DTR OFF</button>
                : <button className='btn btn__primary' onClick={() => toggleDataTerminalMode()}>Toggle DTR ON</button>}
            <input type='text' value={serverAddress} onChange={(e) => setServerAddress(e.target.value)} />
            {isConnected ? <button className='btn btn__danger' onClick={() => disconnect()}>Disconnect</button>
                : <button className='btn btn__primary' onClick={() => connect()}>Connect Mimic</button>}
        </>
    )
}