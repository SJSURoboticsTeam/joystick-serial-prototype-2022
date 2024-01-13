import { useState } from 'react'
import {endpointTest, apis} from './test.js'
import MyResponsiveBoxPlot from './NivoBoxPlot.jsx'
import EndpointEntry from './EndpointEntry.jsx'

function App() {
  const [nivoData, setNivoData] = useState([])
  const [endpoints, setEndpoints] = useState([])
  
  const test = () => {
    endpointTest(2000,200,apis,"test").then(value => {
      setNivoData(value)
    })
  }

  return (
    <div>
        <EndpointEntry setEndpoints={setEndpoints}/>
        <MyResponsiveBoxPlot data={nivoData} />

      <button onClick={test}> Click me</button>
    </div>
  )
}

export default App
