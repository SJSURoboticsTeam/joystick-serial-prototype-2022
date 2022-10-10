import { useEffect, useState } from 'react'
import { useGamepads } from 'react-gamepads';
import { ArmFormat } from '../dto/commands';

export default function ArmControl({ commands }) {
    useGamepads(gamepads => { setGamepads(gamepads[0]) }); // will use the first gamepad connected

    const [gamepad, setGamepads] = useState<Gamepad>();
    const [armCommands, setArmCommands] = useState<ArmFormat>({ heartbeat_count: 0, is_operational: 1, joint_mode: "S", joint_angles: [0, 0, 0, 0, 0] });

    async function handleSubmit(e) {
        e.preventDefault();
        commands.current = `{"heartbeat_count":${armCommands.heartbeat_count},"is_operational":${armCommands.is_operational},"mode":"${armCommands.joint_mode}","angles":[${armCommands.joint_angles}]}`;
    }

    function handleChange(e) {
        setArmCommands({ ...armCommands, [e.target.name]: e.target.value });
    }

    function handleJointAngleChange(e, index) {
        const newArray = [...armCommands.joint_angles];
        newArray[index] = e.target.value;
        setArmCommands({ ...armCommands, joint_angles: newArray });
    }

    useEffect(() => {
        if (gamepad?.id.toLowerCase().includes("microsoft")) {
            const jointMode = armCommands.joint_mode;
            const rotundaAngle = Math.round(gamepad.axes[0] * 90);
            const shoulderAngle = Math.round(gamepad.axes[1] * -90);
            const elbowAngle = Math.round(gamepad.axes[3] * -90);
            const wristRollAngle: number = (gamepad?.axes[2]) ? parseInt((-(gamepad?.axes[2]) * -100).toFixed(0)) : 0;
            const negativeWristPitchAngle: number = (gamepad?.buttons[6]?.value) ? parseInt((-(gamepad?.buttons[6]?.value) * 100).toFixed(0)) : 0;
            const positiveWristPitchAngle: number = (gamepad?.buttons[7]?.value) ? parseInt((-(gamepad?.buttons[7]?.value) * -100).toFixed(0)) : 0;
            const wristPitchAngle: number = negativeWristPitchAngle + positiveWristPitchAngle;
            setArmCommands({ ...armCommands, joint_mode: jointMode, joint_angles: [rotundaAngle, shoulderAngle, elbowAngle, wristPitchAngle, wristRollAngle] });
            handleSubmit(new Event('submit'));
        }
    }, [gamepad]);


    useEffect(() => {
        handleSubmit(new Event('submit'));
    }, [armCommands]);

    useEffect(() => {
        handleSubmit(new Event('submit'));
    }, []);

    const jointControl = (
        <>
            <label className='label_lg'> Joint Mode</label>
            <div className='btn-group'>
                <select className='input-text' name='joint_mode' value={armCommands.joint_mode} onChange={handleChange}>
                    <option value="S">Joint</option>
                    <option value="C">Hand</option>
                </select>
                <button className='btn btn__primary' onClick={() => setArmCommands({ ...armCommands, joint_mode: "S" })}>Joint</button>
                <button className='btn btn__primary' onClick={() => setArmCommands({ ...armCommands, joint_mode: "C", joint_angles: [0, 0, 0, 0, 0] })}>Hand</button>
            </div>
            {armCommands.joint_mode === "S" &&
                <>
                    <div className='btn-group'>
                        <label className='label_lg'> Rotunda Angle
                            <input autoComplete='off' className='input-text' type='number' name="joint_angles" value={armCommands.joint_angles[0]} onChange={(e) => handleJointAngleChange(e, 0)} />
                        </label>
                        <input autoComplete='off' className='slider' type='range' name="joint_angles" min={-180} max={180} value={armCommands.joint_angles[0]} onChange={(e) => handleJointAngleChange(e, 0)} />
                    </div>

                    <div className='btn-group'>
                        <label className='label_lg'> Shoulder Angle
                            <input autoComplete='off' className='input-text' type='number' name="joint_angles" value={armCommands.joint_angles[1]} onChange={(e) => handleJointAngleChange(e, 1)} />
                        </label>
                        <input autoComplete='off' className='slider' type='range' name="joint_angles" min={-180} max={180} value={armCommands.joint_angles[1]} onChange={(e) => handleJointAngleChange(e, 1)} />
                    </div>

                    <div className='btn-group'>
                        <label className='label_lg'> Elbow Angle
                            <input autoComplete='off' className='input-text' type='number' name="joint_angles" value={armCommands.joint_angles[2]} onChange={(e) => handleJointAngleChange(e, 2)} />
                        </label>
                        <input autoComplete='off' className='slider' type='range' name="joint_angles" min={-180} max={180} value={armCommands.joint_angles[2]} onChange={(e) => handleJointAngleChange(e, 2)} />
                    </div>

                    <div className='btn-group'>
                        <label className='label_lg'>Wrist Pitch Angle
                            <input autoComplete='off' className='input-text' type='number' name="joint_angles" value={armCommands.joint_angles[3]} onChange={(e) => handleJointAngleChange(e, 3)} />
                        </label> <input autoComplete='off' className='slider' type='range' name="joint_angles" min={-180} max={180} value={armCommands.joint_angles[3]} onChange={(e) => handleJointAngleChange(e, 3)} />
                    </div>

                    <div className='btn-group'>
                        <label className='label_lg'>Wrist Roll Angle
                            <input autoComplete='off' className='input-text' type='number' name="joint_angles" value={armCommands.joint_angles[4]} onChange={(e) => handleJointAngleChange(e, 4)} />
                        </label>
                        <input autoComplete='off' className='slider' type='range' name="joint_angles" min={-180} max={180} value={armCommands.joint_angles[4]} onChange={(e) => handleJointAngleChange(e, 4)} />
                    </div>
                </>
            }

            {armCommands.joint_mode === "C" &&
                <>
                    <div className='btn-group'>
                        <label className='label_lg'> Rotunda Angle
                            <input autoComplete='off' disabled className='input-text' type='number' name="joint_angles" value={armCommands.joint_angles[0]} onChange={(e) => handleJointAngleChange(e, 0)} />
                        </label>
                        <input autoComplete='off' disabled className='slider' type='range' name="joint_angles" min={-180} max={180} value={armCommands.joint_angles[0]} onChange={(e) => handleJointAngleChange(e, 0)} />
                    </div>

                    <div className='btn-group'>
                        <label className='label_lg'> Shoulder Angle
                            <input autoComplete='off' disabled className='input-text' type='number' name="joint_angles" value={armCommands.joint_angles[1]} onChange={(e) => handleJointAngleChange(e, 1)} />
                        </label>
                        <input autoComplete='off' disabled className='slider' type='range' name="joint_angles" min={-180} max={180} value={armCommands.joint_angles[1]} onChange={(e) => handleJointAngleChange(e, 1)} />
                    </div>

                    <div className='btn-group'>
                        <label className='label_lg'> Elbow Angle
                            <input autoComplete='off' disabled className='input-text' type='number' name="joint_angles" value={armCommands.joint_angles[2]} onChange={(e) => handleJointAngleChange(e, 2)} />
                        </label>
                        <input autoComplete='off' disabled className='slider' type='range' name="joint_angles" min={-180} max={180} value={armCommands.joint_angles[2]} onChange={(e) => handleJointAngleChange(e, 2)} />
                    </div>

                    <div className='btn-group'>
                        <label className='label_lg'> Left Wrist Angle
                            <input autoComplete='off' disabled className='input-text' type='number' name="joint_angles" value={armCommands.joint_angles[3]} onChange={(e) => handleJointAngleChange(e, 3)} />
                        </label> <input autoComplete='off' disabled className='slider' type='range' name="joint_angles" min={-180} max={180} value={armCommands.joint_angles[3]} onChange={(e) => handleJointAngleChange(e, 3)} />
                    </div>

                    <div className='btn-group'>
                        <label className='label_lg'> Right Wrist Angle
                            <input autoComplete='off' disabled className='input-text' type='number' name="joint_angles" value={armCommands.joint_angles[4]} onChange={(e) => handleJointAngleChange(e, 4)} />
                        </label>
                        <input autoComplete='off' disabled className='slider' type='range' name="joint_angles" min={-180} max={180} value={armCommands.joint_angles[4]} onChange={(e) => handleJointAngleChange(e, 4)} />
                    </div>
                </>
            }
        </>
    )

    return (
        <div className='serial'>
            <h2>Arm Control</h2>
            <form className='serial-form' onSubmit={handleSubmit}>
                {jointControl}
                {/* {handControl} */}
                <button className='btn btn__primary btn__lg btn-send' type="submit">Send</button>
            </form>
        </div>
    )
}
