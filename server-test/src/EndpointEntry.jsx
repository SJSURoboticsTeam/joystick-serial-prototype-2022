import { useState } from 'react'


const EndpointEntry = ({endpoints, addEndpoint}) => {

    const [method, setMethod] = useState("GET")
    const [api, setAPI] = useState("")
    const [header, setHeader] = useState({})

    const methodChange = (event) => {
        console.log('method change')
        console.log(event.target.value)
        
        setMethod(event.target.value)
    }

    const apiChange = (event) => {
        console.log(event.target.value)
        setAPI(event.target.value)
    }

    const changeTabKey = (event) => {
        console.log("tab")
        if (event.key === 'Tab') {
            event.preventDefault()
            let index = event.target.selectionStart
            event.target.value = event.target.value.substring(0, index) + '\t' + event.target.value.substring(index)
            event.target.selectionStart = e.target.selectionEnd = index + 1;
        }
        
    }

    const bodyChange = (event) => {
        let header
        header = JSON.parse(event.target.value)
        setHeader(header)
       
    }

    const handleAddEndpoint = (event) => {

        let endpoint = {
            endpoint: api,
            init : {
                method: method,
                cache: "no-cache",
                mode: "no-cors"
            }
        }
        
        if (method == "POST") {
            endpoint.init.headers = {'Content-Type': 'application/json'}
            endpoint.init.body = JSON.stringify(header)
        }

        console.log(endpoint)

        addEndpoint([...endpoints, endpoint])
        console.log(endpoints)

    }

    return (
        <div>

            <div>
                <select onChange={methodChange}>
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                </select>
                <input placeholder="API URL" onChange={apiChange}></input>
            </div>

            <div>
                {method === 'POST' && <textarea
                    onInput={bodyChange} 
                    onKeyDown={changeTabKey} 
                > </textarea>}
            </div>

            <button onClick={handleAddEndpoint} > Add Endpoint</button>
            
        </div>
    )
}

export default EndpointEntry