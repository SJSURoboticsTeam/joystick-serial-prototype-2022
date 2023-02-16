import os from "os";
import cors from 'cors'
import express from "express";

const port = 5000;
const app = express();
const networkInterfaces = os.networkInterfaces();

const defaultResponse = {
    "heartbeat_count": 0,
    "is_operational": 0
};

let gpsStatus: any = defaultResponse;
let driveStatus: any = defaultResponse;
let armStatus: any = defaultResponse;
let armCommands: any = defaultResponse;
let driveCommands: any = defaultResponse;
let scienceCommands: any = defaultResponse;
let scienceStatus: any = defaultResponse;

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

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
    res.send("Drive Commands Received");
});

app.get("/drive/status", (req, res) => {
    console.log("GET drive/status");
    res.json(driveStatus);
});

app.get("/arm", (req, res) => {
    armStatus = (req.query);
    console.log("GET /arm");
    res.send(armCommands);
});

app.post("/arm", (req, res) => {
    armCommands = (req.body);
    console.log("POST /arm");
    res.send("Arm Commands Received");
});

app.get("/arm/status", (req, res) => {
    console.log("GET arm/status");
    res.json(armStatus);
});

app.get("/gps", (req, res) => {
    console.log("GET /gps");
    res.send(gpsStatus);
});

app.post("/gps", (req, res) => {
    gpsStatus = req.body;
    console.log(req.body)
    console.log("POST /gps");
    res.send("GPS Data Received");
});

app.get("/science", (req, res) => {
    console.log("GET /science");
    scienceStatus = req.query;
    res.send(scienceCommands);
})

app.post("/science", (req, res) => {
    scienceCommands = (req.body);
    console.log("POST /science");
    res.send("Science Commands Received");
})

app.get("/science/status", (req, res) => {
    console.log("GET /science/status");
    res.send(scienceStatus);
})


app.listen(port, () => {
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