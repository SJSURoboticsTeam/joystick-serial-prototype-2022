import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Wifi({ commands, setStatus, wifiConfigConnect = null, endpoint = null }) {
    const [isConnected, setIsConnected] = useState(false);
    const [serverAddress, setServerAddress] = useState(`http://localhost:5000/${endpoint}`);
    
    function connect() {
        setIsConnected(true);
        wifiConfigConnect(true);
    }

    function disconnect() {
        setIsConnected(false);
        wifiConfigConnect(false);
    }

    async function writeCommands() {
        if (isConnected) {
            try {
                const responseStatus = await axios.post(serverAddress,  JSON.parse(commands.current));
                setStatus(responseStatus.data);
            }
            catch (error) {
                console.log(error)
                disconnect();
                setStatus("Unable to post commands, verify backend is running");
            }
        }
    }

    useEffect(() => {
        const writeInterval = setInterval(() => {
            if (isConnected) {
                writeCommands();
            }
        }, 200);
        return () => clearInterval(writeInterval);
    }, [isConnected]);

    return (
        <>
            {!endpoint ? <input autoComplete='off' className='input-text' type='text' value={serverAddress} onChange={e => setServerAddress(e.target.value)} />
            : <></> }
            {isConnected ? <button className='btn btn__danger' onClick={disconnect}>Disconnect</button>
                : <button className='btn btn__primary' onClick={connect}>Connect</button>}
        </>
    )
}
