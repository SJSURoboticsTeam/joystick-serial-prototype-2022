import React from 'react'
import ROVER_STATUS from '../mock/arm-status-response.json';

export default function ArmStatus(props) {
    return (
        <div>Arm Status
            <div>{JSON.stringify(ROVER_STATUS, null, 4)}</div>
        </div>
    )
}
