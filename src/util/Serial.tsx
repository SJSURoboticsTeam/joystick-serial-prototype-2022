import React, { useState } from 'react'

export default function Serial() {
    const [responses, setResponses] = useState(["example", "of", "responses"])
    const [commands, setCommands] = useState("");
    const [port, setPort] = useState<SerialPort>();

    const connect = async () => {
        await setPort(await navigator.serial.requestPort());
        await port.open({ baudRate: 9600 });
    }

    const disconnect = async () => {
        await port.close();
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await writeCommands();
        console.log(`Sent: ${commands}`);
        setCommands("");
    }

    async function writeCommands() {
        const encoder = new TextEncoder();
        const writer = port.writable.getWriter();
        await writer.write(encoder.encode(commands));
        writer.releaseLock();
    }

    // TODO: Figure out how to read response from device
    // https://web.dev/serial/#read-port
    const getResponses = responses.map((response, index) =>
        <div key={index}>{index}: {response}</div>
    )

    return (
        <div>
            <h2>Serial</h2>
            <button onClick={() => connect()}>Connect</button>
            <button onClick={() => console.log(port)}>Status</button>
            <form onSubmit={handleSubmit}>
                <input placeholder='send 0 to toggle off led' type="text" value={commands} onChange={(e) => setCommands(e.target.value)} />
                <button type='submit'>Send</button>
            </form>
            <button onClick={() => disconnect()}>Disconnect</button>
            {getResponses}
        </div>
    )
}
