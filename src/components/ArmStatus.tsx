import React from 'react'
import ROVER_STATUS from '../mock/arm-status-response.json';

export default function ArmStatus(props) {
    return (
        <div>
            <h2>Arm Status</h2>
            <div>{JSON.stringify(ROVER_STATUS, null, 4)}</div>
        </div>
    )
}
