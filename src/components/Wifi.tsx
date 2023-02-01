import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Wifi({ commands, setStatus }) {
    const [isConnected, setIsConnected] = useState(false);
    const [serverAddress, setServerAddress] = useState("http://localhost:5000/drive");

    function connect() {
        setIsConnected(true);
    }

    function disconnect() {
        setIsConnected(false);
    }

    async function readStatus() {
        if (isConnected) {
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

    async function writeCommands() {
        if (isConnected) {
            try {
                await axios.post(serverAddress, JSON.parse(commands.current))
            }
            catch (error) {
                disconnect();
                console.error("Verify backend is running!");
            }
        }
    }

    useEffect(() => {
        const writeInterval = setInterval(() => {
            if (isConnected) {
                console.log("Reading and writing commands...");
                readStatus();
                writeCommands();
            }
        }, 200);
        return () => clearInterval(writeInterval);
    }, [isConnected]);

    return (
        <>
            <input autoComplete='off' className='input-text' type='text' value={serverAddress} onChange={e => setServerAddress(e.target.value)} />
            {isConnected ? <button className='btn btn__danger' onClick={disconnect}>Disconnect</button>
                : <button className='btn btn__primary' onClick={connect}>Connect WiFi</button>}
        </>
    )
}
