import os from "os";
import cors from 'cors'
import express from "express";

const port = 5001;
const app = express();
const networkInterfaces = os.networkInterfaces();

const defaultResponse = {
    "heartbeat_count": 0,
    "is_operational": 0
};

let gpsStatus: any = [{"1":[37.33304950528962,-121.87961704036292]},{"2":[37.33223907939224,-121.88136584064063]}]
let driveStatus: any = defaultResponse;
let armStatus: any = defaultResponse;
let armCommands: any = defaultResponse;
let driveCommands: any = defaultResponse;

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
    gpsStatus = (req.body);
    console.log("POST /gps");
    res.send("GPS Data Received");
});

app.listen(port, () => {
    console.log(`Server: http://localhost:5000`);
    for (const key in networkInterfaces) {
        const networkInterface = networkInterfaces[key];
        for (const network of networkInterface as any) {
            if (network.family === "IPv4" && !network.internal) {
                console.log(`Network: http://${network.address}:${port}`);
            }
        }
    }
});