import os from "os";
import express from "express";

const port = 5000;
const app = express();
const networkInterfaces = os.networkInterfaces();

const defaultResponse = {
    "heartbeat_count": 0,
    "is_operational": 0
};

let driveStatus: any = defaultResponse;
let armStatus: any = defaultResponse;
let armCommands: any = defaultResponse;
let driveCommands: any = defaultResponse;

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Mission Control Web Server - Built using ExpressJS");
});

app.get("/status", (req, res) => {
    console.log("GET /status");
    res.json({ armStatus, driveStatus });
});

app.get("/drive", (req, res) => {
    driveStatus = (req.query);
    console.log("GET /drive");
    res.send(driveCommands);
});

app.get("/arm", (req, res) => {
    armStatus = (req.query);
    console.log("GET /arm");
    res.send(armCommands);
});

app.post("/drive", (req, res) => {
    driveCommands = (req.body);
    console.log("POST /drive");
    res.send("Drive Commands Received");
});

app.post("/arm", (req, res) => {
    armCommands = (req.body);
    console.log("POST /arm");
    res.send("Arm Commands Received");
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