import os from "os";
import express from "express";

const port = 5000;
const app = express();
const networkInterfaces = os.networkInterfaces();

let armStatus = "";
let armCommands = "";
let driveStatus = "";
let driveCommands = "";

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.send("Mission Control Web Server - Built using ExpressJS");
});

app.get("/drive", (req, res) => {
    res.send({
        message: `{"heartbeat_count":0,"is_operational":1,"arm_speed":0,"rotunda_angle":0,"shoulder_angle":0,"elbow_angle":0,"wrist_pitch_angle":0,"wrist_yaw_angle":0,"joint_mode":"D","pinky_angle":0,"ring_angle":0,"middle_angle":0,"index_angle":0,"thumb_angle":0,"hand_mode":"D"}`,
    });
});

app.post("/drive", (req, res) => {
    console.log(req.body);
});

app.get("/arm", (req, res) => {
    res.send({
        message: `{"heartbeat_count":0,"is_operational":1,"arm_speed":0,"rotunda_angle":0,"shoulder_angle":0,"elbow_angle":0,"wrist_pitch_angle":0,"wrist_yaw_angle":0,"joint_mode":"D","pinky_angle":0,"ring_angle":0,"middle_angle":0,"index_angle":0,"thumb_angle":0,"hand_mode":"D"}`,
    });
});

app.post("/arm", (req, res) => {
    console.log(req.body);
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