export {}

async function endpointTest(timespan: number, rate: number, apiEndpoints: string[], useCache: boolean, testName: string) {    
    
    let testResults = {}
    let testStartTime = performance.now()
    let index = 0
    let fetchStartTime : number
    let fetchEndTime : number

    let intervalID = setInterval(() => {
        fetchStartTime = performance.now()
        fetch(apiEndpoints[index], {cache: useCache ? "default" : "no-store"})
            .then(response => {
                fetchEndTime = performance.now()
                //end - start time report
            })
            .catch(error => {
                // report -1 for time
            });

        index++
        if (index > apiEndpoints.length)
            index = 0
        
        
        if (fetchEndTime - testStartTime > timespan)
            clearInterval(intervalID)
    }, rate)
}
let endPointList = ["https://www.google.com/",""]
endpointTest(5000,500, endPointList, false, "")

