import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Mock({ status, setStatus }) {
    const [isConnected, setIsConnected] = useState(false);
    const [serverAddress, setServerAddress] = useState("http://localhost:5000/drive");

    function connect() {
        setIsConnected(true);
    }

    function disconnect() {
        setIsConnected(false);
    }

    async function writeCommands() {
        if (isConnected) {
            try {
                const response = await axios.get(serverAddress, { params: { ...status }})
                const serverCommands = response.data
                const newStatus = {
                    heartbeat_count: serverCommands?.HB || 0,
                    is_operational: serverCommands?.IO || 1,
                    wheel_orientation: serverCommands?.WO || 0,
                    drive_mode: serverCommands?.DM || 'D',
                    speed: serverCommands?.CMD?.[0] || 0,
                    angle: serverCommands?.CMD?.[1] || 0
                }

                setStatus(newStatus);
            }
            catch (error) {
                disconnect();
                setStatus("Unable to get status, verify backend is running");
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
            <input autoComplete='off' className='input-text' type='text' value={serverAddress} onChange={e => setServerAddress(e.target.value)} />
            {isConnected ? <button className='btn btn__danger' onClick={disconnect}>Disconnect</button>
                : <button className='btn btn__primary' onClick={connect}>Connect</button>}
        </>
    )
}
