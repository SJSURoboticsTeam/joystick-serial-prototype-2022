import { useState } from 'react'
import {endpointTest, apis} from './test.js'
import MyResponsiveBoxPlot from './NivoBoxPlot.jsx'
import EndpointEntry from './EndpointEntry.jsx'

function App() {
  const [nivoData, setNivoData] = useState([])
  const [endpoints, setEndpoints] = useState([])
  const [rate, setRate] = useState(0)
  const [time, setTime] = useState(0)

  const rateChange = (event) => {
    setRate(Number(event.target.value))
    console.log(Number(event.target.value))
  }

  const timeChange = (event) => {
    setTime(Number(event.target.value))
    console.log(Number(event.target.value))
  }
  
  const test = () => {
    console.log(endpoints)
    endpointTest(time,rate,endpoints,"test").then(value => {
      setNivoData(value)
      console.log("finish")
    })
    
  }

  const reset = () => {
    setEndpoints([])
  }

  return (
    <div>
        <EndpointEntry endpoints={endpoints}  addEndpoint={setEndpoints}/>
        <MyResponsiveBoxPlot data={nivoData} />
        
        <div>
          <input input type="number" min="0" placeholder="rate" onChange={rateChange}></input>
          <input input type="number" min="0" placeholder="time" onChange={timeChange}></input>
          <button onClick={test}> Test</button>
          <button onClick ={reset}> Reset</button>
        </div>

        <div>
          {endpoints.map(function(data) {
            return (
              <div>
                {data.endpoint}
              </div>
            )
          })}
        </div>
        
    </div>
    
  )
}

export default App