import React, { useState } from 'react'
import { GamepadsContext } from 'react-gamepads';

export default function ArmControl(props) {
    const [speed, setSpeed] = useState("0");
    const [mode, setMode] = useState("D");
    const [rotundaAngle, setRotundaAngle] = useState("0");
    const [shoulderAngle, setShoulderAngle] = useState("0");
    const [elbowAngle, setElbowAngle] = useState("0");
    const [wristPitch, setWristPitch] = useState("0");
    const [wristYaw, setWristYaw] = useState("0");

    function handleSubmit(e) {
        e.preventDefault();
        const encoder = new TextEncoder();
        console.log(encoder.encode(speed));
        setSpeed("");
    }

    return (
        <div className='serial'>
            <h2>Arm Control</h2>
            <div className='btn-group'>
                <button className='btn btn__primary'>Connect</button>
                <button className='btn'>Status</button>
                <button className='btn btn__danger'>Disconnect</button>
            </div>
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
