import { useEffect, useState } from 'react'

export default function Serial(props) {
    let serialResponse = "";
    const [port, setPort] = useState<SerialPort>();
    const [isConnected, setIsConnected] = useState(false);
    const [reader, setReader] = useState<ReadableStreamDefaultReader>();
    const [writer, setWriter] = useState<WritableStreamDefaultWriter>();

    const connect = async () => {
        let newPort = await navigator.serial.requestPort();
        // await newPort.open({ baudRate: 9600 });
        await newPort.open({ baudRate: 38400 });
        await newPort.setSignals({ dataTerminalReady: false, requestToSend: false });
        setReader(newPort.readable.getReader());
        setWriter(newPort.writable.getWriter());
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
            serialResponse += await decoded;

            let responseArray = [];
            serialResponse.split('\n').forEach(line => {
                if (line.includes('{') && line.includes('}')) {
                    responseArray.push(line);
                    console.log(line);
                }
            })

            if (serialResponse !== undefined) {
                console.log("Array:", responseArray);
                if (serialResponse.includes("{") && serialResponse.includes("}")) {
                    serialResponse = responseArray.pop();
                    serialResponse = JSON.parse(serialResponse);
                    console.log("Parsed JSON: ", serialResponse);
                    props.setRoverStatus(serialResponse);
                    serialResponse = "";
                }
            }

        }
    }

    async function writeSerial() {
        const newCommandString = JSON.stringify({
            "heartbeat_count": 1,
            "is_operational": 1,
            "wheel_shift": parseInt(props.roverCommands.wheelOrientation),
            "drive_mode": String(props.roverCommands.mode),
            "speed": parseInt(props.roverCommands.speed),
            "angle": parseInt(props.roverCommands.angle)
        });
        //console.log('Wrote:', newCommandString);
        try {
            if (writer && port) {
                await writer.write(new TextEncoder().encode(newCommandString));
            }
        } catch (error) {
            console.error("Serial is not connected most likely!");
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            //console.log("Printing commands every second: ", props.roverCommands);
            writeSerial();
        }, 50);
        return () => clearInterval(interval);
    }, [props.roverCommands]);

    return (
        <>
            {isConnected ? <button className='btn btn__danger' onClick={() => disconnect()}>Disconnect</button> : <button className='btn btn__primary' onClick={() => connect()}>Connect</button>}
            <button className='btn' onClick={() => readSerial()}>Read</button>
            <button className='btn' onClick={() => writeSerial()}>Write</button>
            <button className='btn' onClick={() => console.log(port, reader, writer)}>Status</button>
        </>
    )
}