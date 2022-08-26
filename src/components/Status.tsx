import { memo } from 'react'

const Status = ({ roverStatus }) => {
    return (
        <div>
            <h2>Rover Status</h2>
            <pre>{JSON.stringify(roverStatus, null, 2)}</pre>
        </div>
    )
}

export default memo(Status);
