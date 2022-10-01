import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Wifi({ commands, setStatus }) {
    const [isConnected, setIsConnected] = useState(false);
    const [webServerAddress, setWebServerAddress] = useState("http://localhost:5000/drive");

    function connect() {
        setIsConnected(true);
    }

    function disconnect() {
        setIsConnected(false);
    }

    async function readStatus() {
        if (isConnected) {
            try {
                let response = await axios.get(webServerAddress + "/status");
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
                await axios.post(webServerAddress, JSON.parse(commands.current))
            }
            catch (error) {
                disconnect();
                console.error("Verify backend is running!");
            }
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (isConnected) {
                console.log("Reading and writing commands...");
                readStatus();
                writeCommands();
            }
        }, 500);
        return () => clearInterval(interval);
    }, [isConnected]);

    return (
        <>
            <input autoComplete='off' className='input-text' type='text' value={webServerAddress} onChange={e => setWebServerAddress(e.target.value)} />
            {isConnected ? <button className='btn btn__danger' onClick={disconnect}>Disconnect</button> : <button className='btn btn__primary' onClick={connect}>Connect</button>}
        </>
    )
}
