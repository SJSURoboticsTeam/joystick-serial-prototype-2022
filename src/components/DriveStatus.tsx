import React from 'react'
import ROVER_STATUS from '../mock/drive-status-response.json';


export default function DriveStatus() {
    return (
        <div>
            <h2>Drive Status</h2>
            <div>{JSON.stringify(ROVER_STATUS, null, 4)}</div>

        </div>
    )
}
