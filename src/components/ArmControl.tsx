import { useEffect, useState } from 'react'
import { ArmFormat } from '../dto/commands';

export default function ArmControl({ commands }) {
    const [armCommands, setArmCommands] = useState<ArmFormat>({ heartbeat_count: 0, is_operational: 1, speed: 5, joint_mode: "S", joint_angles: [0, 0, 0, 0, 0], hand_mode: "I", hand_angles: [88, 88, 88, 88, 88] });

    async function handleSubmit(e) {
        e.preventDefault();
        commands.current = `{"heartbeat_count":${armCommands.heartbeat_count},"is_operational":${armCommands.is_operational},"speed":${armCommands.speed},"joint_mode":"${armCommands.joint_mode}","joint_angles":[${armCommands.joint_angles}],"hand_mode":"${armCommands.hand_mode}","hand_angles":[${armCommands.hand_angles}]}`;
        console.log("Updated arm commands!");
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

    function handleSimultaneousHandModeChange(e) {
        const newArray = [...armCommands.hand_angles];
        newArray.fill(e.target.value);
        setArmCommands({ ...armCommands, hand_angles: newArray });
    }

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
                    <option value="S">Simultaneous</option>
                    <option value="C">Condensed</option>
                </select>
                <button className='btn btn__primary' onClick={() => setArmCommands({ ...armCommands, joint_mode: "S" })}>Simultaneous</button>
                <button className='btn btn__primary' onClick={() => setArmCommands({ ...armCommands, joint_mode: "C", joint_angles: [0, 0, 0, 0, 0] })}>Condensed</button>
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
                        <label className='label_lg'> Left Wrist Angle
                            <input autoComplete='off' className='input-text' type='number' name="joint_angles" value={armCommands.joint_angles[3]} onChange={(e) => handleJointAngleChange(e, 3)} />
                        </label> <input autoComplete='off' className='slider' type='range' name="joint_angles" min={-180} max={180} value={armCommands.joint_angles[3]} onChange={(e) => handleJointAngleChange(e, 3)} />
                    </div>

                    <div className='btn-group'>
                        <label className='label_lg'> Right Wrist Angle
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

    const handControl = (
        <>
            <label className='label_lg'> Hand Mode </label>
            <div className='btn-group'>
                <select className='input-text' name="hand_mode" value={armCommands.hand_mode} onChange={handleChange} >
                    <option value="C">Closed</option>
                    <option value="O">Open</option>
                    <option value="I">Individual</option>
                    <option value="S">Simultaneous</option>
                </select>
                <button className='btn btn__primary' onClick={() => setArmCommands({ ...armCommands, hand_mode: "O", hand_angles: [175, 175, 175, 175, 175] })}>Open</button>
                <button className='btn btn__primary' onClick={() => setArmCommands({ ...armCommands, hand_mode: "C", hand_angles: [88, 88, 88, 88, 88] })}>Close</button>
                <button className='btn btn__primary' onClick={() => setArmCommands({ ...armCommands, hand_mode: "S" })}>Simultaneous</button>
                <button className='btn btn__primary' onClick={() => setArmCommands({ ...armCommands, hand_mode: "I" })}>Individual</button>
            </div>

            {(armCommands.hand_mode === "C" || armCommands.hand_mode === "O") &&
                <>
                    <div className='btn-group'>
                        <label className='label_lg'> Pinky Finger Angle
                            <input autoComplete='off' disabled className='input-text' type='number' name="hand_angles" value={armCommands.hand_angles[0]} onChange={(e) => handleHandAngleChange(e, 0)} />
                        </label>
                        <input className='slider' disabled type="range" min="88" max="175" name="hand_angles" value={armCommands.hand_angles[0]} onChange={(e) => handleHandAngleChange(e, 0)} />
                    </div>

                    <div className='btn-group'>
                        <label className='label_lg'> Ring Finger Angle
                            <input autoComplete='off' disabled className='input-text' type='number' name="hand_angles" value={armCommands.hand_angles[1]} onChange={(e) => handleHandAngleChange(e, 1)} />
                        </label>
                        <input className='slider' disabled type="range" min="88" max="175" name="hand_angles" value={armCommands.hand_angles[1]} onChange={(e) => handleHandAngleChange(e, 1)} />
                    </div>

                    <div className='btn-group'>
                        <label className='label_lg'> Middle Finger Angle
                            <input autoComplete='off' disabled className='input-text' type='number' name="hand_angles" value={armCommands.hand_angles[2]} onChange={(e) => handleHandAngleChange(e, 2)} />
                        </label>
                        <input className='slider' disabled type="range" min="88" max="175" name="hand_angles" value={armCommands.hand_angles[2]} onChange={(e) => handleHandAngleChange(e, 2)} />
                    </div>

                    <div className='btn-group'>
                        <label className='label_lg'> Index Finger Angle
                            <input autoComplete='off' disabled className='input-text' type='number' name="hand_angles" value={armCommands.hand_angles[3]} onChange={(e) => handleHandAngleChange(e, 3)} />
                        </label>
                        <input className='slider' disabled type="range" min="88" max="175" name="hand_angles" value={armCommands.hand_angles[3]} onChange={(e) => handleHandAngleChange(e, 3)} />
                    </div>

                    <div className='btn-group'>
                        <label className='label_lg'> Thumb Finger Angle
                            <input autoComplete='off' disabled className='input-text' type='number' name="hand_angles" value={armCommands.hand_angles[4]} onChange={(e) => handleHandAngleChange(e, 4)} />
                        </label>
                        <input className='slider' disabled type="range" min="88" max="175" name="hand_angles" value={armCommands.hand_angles[4]} onChange={(e) => handleHandAngleChange(e, 4)} />
                    </div>
                </>
            }

            {armCommands.hand_mode === "I" &&
                <>
                    <div className='btn-group'>
                        <label className='label_lg'> Pinky Finger Angle
                            <input autoComplete='off' className='input-text' type='number' name="hand_angles" value={armCommands.hand_angles[0]} onChange={(e) => handleHandAngleChange(e, 0)} />
                        </label>
                        <input className='slider' type="range" min="88" max="175" name="hand_angles" value={armCommands.hand_angles[0]} onChange={(e) => handleHandAngleChange(e, 0)} />
                    </div>

                    <div className='btn-group'>
                        <label className='label_lg'> Ring Finger Angle
                            <input autoComplete='off' className='input-text' type='number' name="hand_angles" value={armCommands.hand_angles[1]} onChange={(e) => handleHandAngleChange(e, 1)} />
                        </label>
                        <input className='slider' type="range" min="88" max="175" name="hand_angles" value={armCommands.hand_angles[1]} onChange={(e) => handleHandAngleChange(e, 1)} />
                    </div>

                    <div className='btn-group'>
                        <label className='label_lg'> Middle Finger Angle
                            <input autoComplete='off' className='input-text' type='number' name="hand_angles" value={armCommands.hand_angles[2]} onChange={(e) => handleHandAngleChange(e, 2)} />
                        </label>
                        <input className='slider' type="range" min="88" max="175" name="hand_angles" value={armCommands.hand_angles[2]} onChange={(e) => handleHandAngleChange(e, 2)} />
                    </div>

                    <div className='btn-group'>
                        <label className='label_lg'> Index Finger Angle
                            <input autoComplete='off' className='input-text' type='number' name="hand_angles" value={armCommands.hand_angles[3]} onChange={(e) => handleHandAngleChange(e, 3)} />
                        </label>
                        <input className='slider' type="range" min="88" max="175" name="hand_angles" value={armCommands.hand_angles[3]} onChange={(e) => handleHandAngleChange(e, 3)} />
                    </div>

                    <div className='btn-group'>
                        <label className='label_lg'> Thumb Finger Angle
                            <input autoComplete='off' className='input-text' type='number' name="hand_angles" value={armCommands.hand_angles[4]} onChange={(e) => handleHandAngleChange(e, 4)} />
                        </label>
                        <input className='slider' type="range" min="88" max="175" name="hand_angles" value={armCommands.hand_angles[4]} onChange={(e) => handleHandAngleChange(e, 4)} />
                    </div>
                </>
            }
            {armCommands.hand_mode === "S" &&
                <>
                    <div className='btn-group'>
                        <label className='label_lg'> Pinky Finger Angle
                            <input autoComplete='off' className='input-text' type='number' name="hand_angles" value={armCommands.hand_angles[0]} onChange={(e) => handleSimultaneousHandModeChange(e)} />
                        </label>
                        <input className='slider' type="range" min="88" max="175" name="hand_angles" value={armCommands.hand_angles[0]} onChange={(e) => handleSimultaneousHandModeChange(e)} />
                    </div>

                    <div className='btn-group'>
                        <label className='label_lg'> Ring Finger Angle
                            <input autoComplete='off' disabled className='input-text' type='number' name="hand_angles" value={armCommands.hand_angles[1]} onChange={(e) => handleHandAngleChange(e, 1)} />
                        </label>
                        <input className='slider' disabled type="range" min="88" max="175" name="hand_angles" value={armCommands.hand_angles[1]} onChange={(e) => handleHandAngleChange(e, 1)} />
                    </div>

                    <div className='btn-group'>
                        <label className='label_lg'> Middle Finger Angle
                            <input autoComplete='off' disabled className='input-text' type='number' name="hand_angles" value={armCommands.hand_angles[2]} onChange={(e) => handleHandAngleChange(e, 2)} />
                        </label>
                        <input className='slider' disabled type="range" min="88" max="175" name="hand_angles" value={armCommands.hand_angles[2]} onChange={(e) => handleHandAngleChange(e, 2)} />
                    </div>

                    <div className='btn-group'>
                        <label className='label_lg'> Index Finger Angle
                            <input autoComplete='off' disabled className='input-text' type='number' name="hand_angles" value={armCommands.hand_angles[3]} onChange={(e) => handleHandAngleChange(e, 3)} />
                        </label>
                        <input className='slider' disabled type="range" min="88" max="175" name="hand_angles" value={armCommands.hand_angles[3]} onChange={(e) => handleHandAngleChange(e, 3)} />
                    </div>

                    <div className='btn-group'>
                        <label className='label_lg'> Thumb Finger Angle
                            <input autoComplete='off' disabled className='input-text' type='number' name="hand_angles" value={armCommands.hand_angles[4]} onChange={(e) => handleHandAngleChange(e, 4)} />
                        </label>
                        <input className='slider' disabled type="range" min="88" max="175" name="hand_angles" value={armCommands.hand_angles[4]} onChange={(e) => handleHandAngleChange(e, 4)} />
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
                {handControl}
                <button className='btn btn__primary btn__lg btn-send' type="submit">Send</button>
            </form>
        </div>
    )
}
