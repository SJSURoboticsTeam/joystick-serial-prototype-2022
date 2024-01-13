import { useState } from 'react'


const EndpointEntry = ({addEndpoint}) => {

    const [endpoint, setEndpoint] = useState({})
    const [method, setMethod] = useState("")
    const [api, setAPI] = useState("")
    const [header, setHeader] = useState("")

    const methodChange = (event) => {
        setMethod(event.target.value)
    }

    const apiChange = (event) => {

    }

    const headerChange = (event) => {
        
    }
    return (
        
        <div>

            <div>
                <select onChange={methodChange}>
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                </select>
                <input placeholder="API URL"></input>
            </div>

            <div>
                <textarea></textarea>
            </div>

            <button>Add Endpoint</button>
        </div>
    )
}

export default EndpointEntry