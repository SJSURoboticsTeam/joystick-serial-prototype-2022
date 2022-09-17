import React, { useState } from 'react'

export default function Wifi({ commands, setStatus }) {
    const [isConnected, setIsConnected] = useState(false);
    const [webServerAddress, setWebServerAddress] = useState("http://192.168.1.28:5000");

    function connect() {
        setIsConnected(true);
    }

    function disconnect() {
        setIsConnected(false);
    }

    return (
        <>
            <input autoComplete='off' className='input-text' type='text' value={webServerAddress} onChange={e => setWebServerAddress(e.target.value)} />
            {isConnected ? <button className='btn btn__danger' onClick={disconnect}>Disconnect</button> : <button className='btn btn__primary' onClick={connect}>Connect</button>}
        </>
    )
}
