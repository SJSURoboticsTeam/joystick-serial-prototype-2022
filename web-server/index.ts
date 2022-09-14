import os from "os";
import express from "express";

const port = 5000;
const app = express();
const networkInterfaces = os.networkInterfaces();

let armStatus = "";
let armCommands = `{"heartbeat_count":0,"is_operational":1,"speed":0,"joint_mode":"D","joint_angles":[0,0,0,0,0],"hand_mode":"I","hand_angles":[0,0,0,0,0]}`;
let driveStatus = "";
let driveCommands = `{"heartbeat_count":0,"is_operational":1,"wheel_orientation":0,"drive_mode":"D","speed":0,"angle":0}`;

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.send("Mission Control Web Server - Built using ExpressJS");
});

app.get("/drive", (req, res) => {
    driveStatus = JSON.stringify(req.query);
    console.log(driveStatus);
    res.send(driveCommands)
});

app.post("/drive", (req, res) => {
    driveCommands = req.body;
    res.send(driveCommands);
});

app.get("/arm", (req, res) => {
    armStatus = JSON.stringify(req.query);
    console.log(armStatus);
    res.send(armCommands);
});

app.post("/arm", (req, res) => {
    armCommands = req.body;
    res.send(armCommands);
});

app.get("/status", (req, res) => {
    res.json({ armStatus, driveStatus });
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