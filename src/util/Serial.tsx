import React, { useState } from 'react'

export default function Serial(props) {
    const [serialCommand, setSerialCommand] = useState("");
    const [isConnected, setIsConnected] = useState(false);

    let port: SerialPort | undefined;

    const connect = async () => {
        try {
            port = await navigator.serial.requestPort();
            await port.open({ baudRate: 9600 });
            console.log("connected!");
            setIsConnected(true);

            // if (port.readable) {
            //     const textDecoder = new TextDecoderStream();
            //     const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
            //     const reader = textDecoder.readable.getReader();
            //     const value = await reader.read();
            //     if (value) {
            //         console.log(value);
            //     }

            //     reader.releaseLock();
            // }

            // if (port.writable) {
            //     const textEncoder = new TextEncoderStream();
            //     const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
            //     const writer = textEncoder.writable.getWriter();
            //     await writer.write("0");
            //     writer.releaseLock();
            // }
            // await port.close();
        }
        catch (error) {
            console.error("unable to connect!", error);
        }
    }

    const disconnect = async () => {
        await port.close();
        console.log("disconnected!");
        setIsConnected(false);
    }

    const write = async () => {
        try {
            const writer = port.writable.getWriter();
            const data = new Uint8Array([48, 48, 48, 48, 48]); // hello
            await writer.write(data);
            writer.releaseLock();
        } catch (error) {
            console.log("unable to write to port!", error);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        write();
        setSerialCommand("");
        console.log("submitted");
    }

    return (
        <div>
            {isConnected ? <button onClick={() => disconnect()}> Disconnect </button> : <button onClick={() => connect()}> Connect </button>}
            <form onSubmit={handleSubmit}>
                <input type="text" value={serialCommand} onChange={(e) => setSerialCommand(e.target.value)} />
                <button type='submit'>Send</button>
            </form>
        </div>
    )
}
