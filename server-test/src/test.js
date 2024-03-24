// export type fetchData = {[key: string] : number}

// export type result = {[key:string] : string | fetchData[]}

// export interface API {
//     endpoint: string
//     init: FetchInit
// }

// export interface FetchInit {
//     method: string
//     cache?: RequestCache
//     headers?: HeadersInit
//     body?: BodyInit
// }

// let driveGetFetchInit: FetchInit = {
//     method: "GET",
//     cache: "no-cache"
// }

// let drivePostFetchInit : FetchInit = {
//     method: "POST",
//     cache: "no-cache",
//     headers: {
//         'Content-Type': 'application/json'
//     },

//     body: JSON.stringify({
//         heartbeat_count: 1,
//         is_operational: 2,
//         wheel_orientation: 3,
//         drive_mode: 4,
//         speed: 5,
//         angle: 6,
//     })
// }
export {}

function createNivoBoxPlotData(sharedData, value) {

    sharedData.n += 1
    sharedData.delta = value - sharedData.mu
    sharedData.mu += sharedData.delta / sharedData.n
    sharedData.m2 += sharedData.delta * (value - sharedData.mu)

    return {
        get group() {return sharedData.group;},
        get subgroup() {return sharedData.subgroup},
        get mu() {return sharedData.mu},
        get sd() {return sharedData.sd},
        get n() {return sharedData.n},
        value: value
    }
}

export async function endpointTest(timespan, rate, apiEndpoints, testName) {  
    console.log("hurdur") 
    console.log(timespan)
    console.log(rate) 
    return new Promise((resolve=> {
        let testResults = {}
        let sharedNivoData = {}
        let nivoData = []
        let fetchPromises = []

        testResults["name"] = testName

        apiEndpoints.forEach(function(api) {
            testResults[api.endpoint + api.init.method] = []
            sharedNivoData[api.endpoint + api.init.method] = {
                group: testName,
                subgroup: api.endpoint + api.init.method,
                mu: 0,
                sd: 0,
                n: 0,
                delta: 0,
                m2: 0,
            }
        });

        let testStartTime = performance.now()
        let index = 0
        let fetchStartTime
        

        let intervalID = setInterval(() => {
            
            fetchStartTime = performance.now();
            (function (closureIndex, closureStartTime){
                console.log("in")
                let api = apiEndpoints[closureIndex]
                let fetchPromise = fetch(api.endpoint, api.init)
                    .then(response => {
                        let timeElapsed = performance.now() - closureStartTime;
                        console.log(timeElapsed);

                        (testResults[api.endpoint + api.init.method]).push({"status": response.status, "time": timeElapsed})
                        nivoData.push(createNivoBoxPlotData(sharedNivoData[api.endpoint + api.init.method],timeElapsed))
                    })
                    .catch(error => {
                        let timeElapsed = performance.now() - closureStartTime;
                        (testResults[api.endpoint + api.init.method]).push({"status": -1, "time": timeElapsed})
                    });
                fetchPromises.push(fetchPromise)
            })(index, fetchStartTime);
            
            index++;
            if (index >= apiEndpoints.length) {index = 0}

            if (performance.now() - testStartTime >= timespan) {
                clearInterval(intervalID)
                
                Promise.allSettled(fetchPromises).then(() => {
                    for (let key in sharedNivoData) {
                        sharedNivoData[key].sd = Math.sqrt(sharedNivoData[key].m2 / sharedNivoData[key].n);
                    }
                    resolve(nivoData);
                })
                

            }
        }, rate);
    }))
}

"http://localhost:5000/drive"
const get = {
    endpoint: "http://localhost:5000/drive",
    init: {
        method: "GET",
        cache: "no-cache",
        mode: "no-cors"
    }
}

const post = {
    endpoint: "http://localhost:5000/drive",
    init : {
        method: "POST",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
            
        body: JSON.stringify({
            heartbeat_count: 1,
            is_operational: 2,
            wheel_orientation: 3,
            drive_mode: 4,
            speed: 5,
            angle: 6,
        })
    }
}

export const apis = [get]

// endpointTest(1000,100,apis,"bruh").then(value => {
//     console.log(JSON.stringify(value, null, 2));
// })