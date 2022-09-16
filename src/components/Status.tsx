const Status = ({ status }) => {
    return (
        <div>
            <h2>Rover Status</h2>
            <pre>{JSON.stringify(status, null, 2)}</pre>
        </div>
    )
}

export default Status;
