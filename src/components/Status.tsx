import React from 'react'

export default function Status(props) {
    return (
        <div>
            <h2>Rover Status</h2>
            <pre>{JSON.stringify(props.roverStatus, null, 2)}</pre>
        </div>
    )
}
