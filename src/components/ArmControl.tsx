import { useState } from 'react'

export default function ArmControl({ roverStatus, setRoverCommands }) {
    const [speed, setSpeed] = useState("0");
    const [mode, setMode] = useState("D");
    const [rotundaAngle, setRotundaAngle] = useState("0");
    const [shoulderAngle, setShoulderAngle] = useState("0");
    const [elbowAngle, setElbowAngle] = useState("0");
    const [wristPitch, setWristPitch] = useState("0");
    const [wristYaw, setWristYaw] = useState("0");
    const [isOperational, setIsOperational] = useState(1);

    function createRoverCommand() {
        const heartbeat_count = roverStatus.heartbeat_count ? roverStatus.heartbeat_count : 0;
        const newCommand = {
            "heartbeat_count": heartbeat_count,
            "is_operational": isOperational,
            "speed": parseInt(speed),
            "joint_mode": mode,
            "rotunda_angle": parseInt(rotundaAngle),
            "shoulder_angle": parseInt(shoulderAngle),
            "elbow_angle": parseInt(elbowAngle),
            "wrist_pitch": parseInt(wristPitch),
            "wrist_yaw": parseInt(wristYaw)
        };
        console.log(newCommand);
        return newCommand;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await setRoverCommands(await createRoverCommand());
    }

    return (
        <div className='serial'>
            <h2>Arm Control</h2>
            <form className='serial-form' onSubmit={handleSubmit}>
                <label className='label_lg'> Speed
                    <input autoComplete='false' className='input-text' name="speed" value={speed} onChange={(e) => setSpeed(e.target.value)} />
                </label>

                <label className='label_lg'> Mode
                    <input autoComplete='false' className='input-text' name="mode" value={mode} onChange={(e) => setMode(e.target.value)} />
                </label>

                <label className='label_lg'> Rotunda Angle
                    <input autoComplete='false' className='input-text' name="rotundaAngle" value={rotundaAngle} onChange={(e) => setRotundaAngle(e.target.value)} />
                </label>

                <label className='label_lg'> Shoulder Angle
                    <input autoComplete='false' className='input-text' name="shoulderAngle" value={shoulderAngle} onChange={(e) => setShoulderAngle(e.target.value)} />
                </label>

                <label className='label_lg'> Elbow Angle
                    <input autoComplete='false' className='input-text' name="elbowAngle" value={elbowAngle} onChange={(e) => setElbowAngle(e.target.value)} />
                </label>

                <label className='label_lg'> Wrist Pitch Angle
                    <input autoComplete='false' className='input-text' name="wristPitch" value={wristPitch} onChange={(e) => setWristPitch(e.target.value)} />
                </label>

                <label className='label_lg'> Wrist Yaw Angle
                    <input autoComplete='false' className='input-text' name="wristYaw" value={wristYaw} onChange={(e) => setWristYaw(e.target.value)} />
                </label>
                <button className='btn btn__primary btn__lg btn-send' type="submit">Send</button>
            </form>

        </div>
    )
}
