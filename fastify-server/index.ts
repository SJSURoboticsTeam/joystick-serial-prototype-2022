import Fastify from 'fastify';
import os from "os";
import cors from '@fastify/cors';
import qs from "qs";
import middie from "@fastify/middie"
import formbody from "@fastify/formbody"

const port = 5000;

export default async function buildApp() {
    const fastify = Fastify({
      logger: true,
    });
  
    await fastify.register(middie)
    await fastify.register(cors)
    await fastify.register(formbody, { parser: (str:string) => qs.parse(str) })
  
    return fastify;
}

const app = await buildApp()

const networkInterfaces = os.networkInterfaces();

const defaultResponse = {
    "heartbeat_count": 0,
    "is_operational": 0
};

let gpsCommands: any = defaultResponse;
let armCommands: any = defaultResponse;
let driveCommands: any = defaultResponse;
let scienceCommands: any = defaultResponse;
let autonomyCommands: any = defaultResponse;

let gpsStatus: any = defaultResponse;
let armStatus: any = defaultResponse;
let driveStatus: any = defaultResponse;
let scienceStatus: any = defaultResponse;
let autonomyStatus: any = defaultResponse;



app.get("/", (req, res) => {
    res.send("Mission Control Web Server - Built using ExpressJS");
});

app.get("/drive", (req, res) => {
    driveStatus = (req.query);
    console.log("GET /drive");
    res.send(driveCommands);
});

app.post("/drive", (req, res) => {
    driveCommands = (req.body);
    console.log("POST /drive");
    res.send(driveStatus);
});

app.get("/drive/status", (req, res) => {
    console.log("GET drive/status");
    res.send(driveStatus);
});

app.get("/arm", (req, res) => {
    armStatus = (req.query);
    console.log("GET /arm");
    res.send(armCommands);
});

app.post("/arm", (req, res) => {
    armCommands = (req.body);
    console.log("POST /arm");
    res.send(armStatus);
});

app.get("/arm/status", (req, res) => {
    console.log("GET arm/status");
    res.send(armStatus);
});

app.get("/gps", (req, res) => {
    console.log("GET /gps");
    gpsStatus = req.query;
    res.send(gpsCommands);
});

app.post("/gps", (req, res) => {
    gpsCommands = req.body;
    console.log("POST /gps");
    res.send(gpsStatus);
});

app.get("/gps/status", (req, res) => {
    console.log("GET /gps/status");
    res.send(gpsStatus);
})

app.get("/science", (req, res) => {
    console.log("GET /science");
    scienceStatus = req.query;
    res.send(scienceCommands);
})

app.post("/science", (req, res) => {
    scienceCommands = (req.body);
    console.log("POST /science");
    res.send(autonomyStatus);
})

app.get("/science/status", (req, res) => {
    console.log("GET /science/status");
    res.send(scienceStatus);
})

app.get("/autonomy", (req, res) => {
    console.log("GET /autonomy");
    autonomyStatus = req.query;
    res.send(autonomyCommands);
})

app.post("/autonomy", (req, res) => {
    autonomyCommands = (req.body);
    console.log("POST /autonomy");
    res.send(autonomyStatus);
})

app.get("/autonomy/status", (req, res) => {
    console.log("GET /autonomy/status");
    res.send(autonomyStatus);
})


app.listen({port}, () => {
    console.log(`Server: http://localhost:${port}`);
    for (const key in networkInterfaces) {
        const networkInterface = networkInterfaces[key];
        for (const network of networkInterface as any) {
            if (network.family === "IPv4" && !network.internal) {
                console.log(`Network: http://${network.address}:${port}`);
            }
        }
    }
});