import { useEffect, useState } from 'react'
import { ArmFormat } from '../dto/commands';

export default function ArmControl({ commands }) {
    const [armCommands, setArmCommands] = useState<ArmFormat>({ heartbeat_count: 0, is_operational: 1, speed: 0, joint_mode: "D", joint_angles: [0, 0, 0, 0, 0], hand_mode: "C", hand_angles: [0, 0, 0, 0, 0] });

    async function handleSubmit(e) {
        e.preventDefault();
        commands.current = await armCommands;
    }

    function handleChange(e) {
        setArmCommands({ ...armCommands, [e.target.name]: e.target.value });
    }

    function handleJointAngleChange(e, index) {
        const newArray = [...armCommands.joint_angles];
        newArray[index] = e.target.value;
        setArmCommands({ ...armCommands, joint_angles: newArray });
    }

    function handleHandAngleChange(e, index) {
        const newArray = [...armCommands.hand_angles];
        newArray[index] = e.target.value;
        setArmCommands({ ...armCommands, hand_angles: newArray });
    }

    useEffect(() => {
        handleSubmit(new Event('submit'));
    }, [armCommands]);


    return (
        <div className='serial'>
            <h2>Arm Control</h2>
            <form className='serial-form' onSubmit={handleSubmit}>
                <label className='label_lg'> Speed
                    <input className='input-text' type='number' name="speed" value={armCommands.speed} onChange={handleChange} />
                </label>

                <label className='label_lg'> Joint Mode
                    <input className='input-text' type='text' name="joint_mode" value={armCommands.joint_mode} onChange={handleChange} />
                </label>

                <label className='label_lg'> Rotunda Angle
                    <input className='input-text' type='number' name="joint_angles" value={armCommands.joint_angles[0]} onChange={(e) => handleJointAngleChange(e, 0)} />
                </label>

                <label className='label_lg'> Shoulder Angle
                    <input className='input-text' type='number' name="joint_angles" value={armCommands.joint_angles[1]} onChange={(e) => handleJointAngleChange(e, 1)} />
                </label>

                <label className='label_lg'> Elbow Angle
                    <input className='input-text' type='number' name="joint_angles" value={armCommands.joint_angles[2]} onChange={(e) => handleJointAngleChange(e, 2)} />
                </label>

                <label className='label_lg'> Left Wrist Angle
                    <input className='input-text' type='number' name="joint_angles" value={armCommands.joint_angles[3]} onChange={(e) => handleJointAngleChange(e, 3)} />
                </label>

                <label className='label_lg'> Right Wrist Angle
                    <input className='input-text' type='number' name="joint_angles" value={armCommands.joint_angles[4]} onChange={(e) => handleJointAngleChange(e, 4)} />
                </label>

                <label className='label_lg'> Hand Mode
                    <input className='input-text' type='text' name="hand_mode" value={armCommands.hand_mode} onChange={handleChange} />
                </label>

                <label className='label_lg'> Pinky Finger Angle
                    <input className='input-text' type='number' name="hand_angles" value={armCommands.hand_angles[0]} onChange={(e) => handleHandAngleChange(e, 0)} />
                </label>

                <label className='label_lg'> Ring Finger Angle
                    <input className='input-text' type='number' name="hand_angles" value={armCommands.hand_angles[1]} onChange={(e) => handleHandAngleChange(e, 1)} />
                </label>

                <label className='label_lg'> Middle Finger Angle
                    <input className='input-text' type='number' name="hand_angles" value={armCommands.hand_angles[2]} onChange={(e) => handleHandAngleChange(e, 2)} />
                </label>

                <label className='label_lg'> Index Finger Angle
                    <input className='input-text' type='number' name="hand_angles" value={armCommands.hand_angles[3]} onChange={(e) => handleHandAngleChange(e, 3)} />
                </label>

                <label className='label_lg'> Thumb Finger Angle
                    <input className='input-text' type='number' name="hand_angles" value={armCommands.hand_angles[4]} onChange={(e) => handleHandAngleChange(e, 4)} />
                </label>
                <button className='btn btn__primary btn__lg btn-send' type="submit">Send</button>
            </form>

        </div>
    )
}
