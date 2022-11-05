import { useEffect, useState } from 'react'
import { useGamepads } from 'react-gamepads';
import { ArmFormat } from '../dto/commands';
import { XboxController } from '../dto/gamepad';

export default function ArmControl({ commands }) {
    useGamepads(gamepads => { setGamepads(gamepads[0]) }); // will use the first gamepad connected

    const [gamepad, setGamepads] = useState<Gamepad>();
    const [armCommands, setArmCommands] = useState<ArmFormat>({ heartbeat_count: 0, is_operational: 1, mode: "J", angles: [0, 0, 0, 0, 0] });

    async function handleSubmit(e) {
        e.preventDefault();
        commands.current = `{"heartbeat_count":${armCommands.heartbeat_count},"is_operational":${armCommands.is_operational},"mode":"${armCommands.mode}","angles":[${armCommands.angles}]}`;
    }

    function handleChange(e) {
        setArmCommands({ ...armCommands, [e.target.name]: e.target.value });
    }

    function handleAngleChange(e, index) {
        const newArray = [...armCommands.angles];
        newArray[index] = e.target.value;
        setArmCommands({ ...armCommands, angles: newArray });
    }

    useEffect(() => {
        function getXboxRotundaAngle(): number {
            return Math.round(gamepad.axes[XboxController.left_analog_x] * 45);
        }

        function getXboxShoulderAngle(): number {
            return Math.round(gamepad.axes[XboxController.left_analog_y] * -90);
        }

        function getXboxElbowAngle(): number {
            return Math.round(gamepad.axes[XboxController.right_analog_y] * -90);
        }

        function getXboxWristRollAngle(): number {
            return (gamepad?.axes[XboxController.right_analog_x]) ? parseInt((-(gamepad?.axes[XboxController.right_analog_x]) * -180).toFixed(0)) : 0;
        }

        function getXboxWristPitchAngle(): number {
            const negativeWristPitchAngle: number = (gamepad?.buttons[XboxController.left_trigger]?.value) ? parseInt((-(gamepad?.buttons[XboxController.left_trigger]?.value) * 180).toFixed(0)) : 0;
            const positiveWristPitchAngle: number = (gamepad?.buttons[XboxController.right_trigger]?.value) ? parseInt((-(gamepad?.buttons[XboxController.right_trigger]?.value) * -180).toFixed(0)) : 0;
            return negativeWristPitchAngle + positiveWristPitchAngle;
        }

        const gamepadId: string = gamepad?.id.toLowerCase() || "";
        if (gamepadId.includes("microsoft") || gamepadId.includes("xbox")) {
            const jointMode = armCommands.mode;
            setArmCommands({ ...armCommands, mode: jointMode, angles: [getXboxRotundaAngle(), getXboxShoulderAngle(), getXboxElbowAngle(), getXboxWristPitchAngle(), getXboxWristRollAngle()] });
            handleSubmit(new Event('submit'));
        }
    }, [gamepad]);


    useEffect(() => {
        handleSubmit(new Event('submit'));
    }, [armCommands]);

    useEffect(() => {
        handleSubmit(new Event('submit'));
    }, []);

    const JointModeView = (
        <>
            <div className='btn-group'>
                <label className='label_lg'> Rotunda Angle
                    <input autoComplete='off' className='input-text' type='number' name="angles" value={armCommands.angles[0]} onChange={(e) => handleAngleChange(e, 0)} />
                </label>
                <input autoComplete='off' className='slider' type='range' name="angles" min={-180} max={180} value={armCommands.angles[0]} onChange={(e) => handleAngleChange(e, 0)} />
            </div>

            <div className='btn-group'>
                <label className='label_lg'> Shoulder Angle
                    <input autoComplete='off' className='input-text' type='number' name="angles" value={armCommands.angles[1]} onChange={(e) => handleAngleChange(e, 1)} />
                </label>
                <input autoComplete='off' className='slider' type='range' name="angles" min={-180} max={180} value={armCommands.angles[1]} onChange={(e) => handleAngleChange(e, 1)} />
            </div>

            <div className='btn-group'>
                <label className='label_lg'> Elbow Angle
                    <input autoComplete='off' className='input-text' type='number' name="angles" value={armCommands.angles[2]} onChange={(e) => handleAngleChange(e, 2)} />
                </label>
                <input autoComplete='off' className='slider' type='range' name="angles" min={-180} max={180} value={armCommands.angles[2]} onChange={(e) => handleAngleChange(e, 2)} />
            </div>

            <div className='btn-group'>
                <label className='label_lg'>Wrist Pitch Angle
                    <input autoComplete='off' className='input-text' type='number' name="angles" value={armCommands.angles[3]} onChange={(e) => handleAngleChange(e, 3)} />
                </label> <input autoComplete='off' className='slider' type='range' name="angles" min={-180} max={180} value={armCommands.angles[3]} onChange={(e) => handleAngleChange(e, 3)} />
            </div>

            <div className='btn-group'>
                <label className='label_lg'>Wrist Roll Angle
                    <input autoComplete='off' className='input-text' type='number' name="angles" value={armCommands.angles[4]} onChange={(e) => handleAngleChange(e, 4)} />
                </label>
                <input autoComplete='off' className='slider' type='range' name="angles" min={-180} max={180} value={armCommands.angles[4]} onChange={(e) => handleAngleChange(e, 4)} />
            </div>
        </>
    )

    const HandModeView = (
        <>
            <div className='btn-group'>
                <label className='label_lg'> Thumb Finger Angle
                    <input autoComplete='off' className='input-text' type='number' name="angles" value={armCommands.angles[0]} onChange={(e) => handleAngleChange(e, 0)} />
                </label>
                <input autoComplete='off' className='slider' type='range' name="angles" min={-180} max={180} value={armCommands.angles[0]} onChange={(e) => handleAngleChange(e, 0)} />
            </div>

            <div className='btn-group'>
                <label className='label_lg'> Index Finger Angle
                    <input autoComplete='off' className='input-text' type='number' name="angles" value={armCommands.angles[1]} onChange={(e) => handleAngleChange(e, 1)} />
                </label>
                <input autoComplete='off' className='slider' type='range' name="angles" min={-180} max={180} value={armCommands.angles[1]} onChange={(e) => handleAngleChange(e, 1)} />
            </div>

            <div className='btn-group'>
                <label className='label_lg'> Middle Finger Angle
                    <input autoComplete='off' className='input-text' type='number' name="angles" value={armCommands.angles[2]} onChange={(e) => handleAngleChange(e, 2)} />
                </label>
                <input autoComplete='off' className='slider' type='range' name="angles" min={-180} max={180} value={armCommands.angles[2]} onChange={(e) => handleAngleChange(e, 2)} />
            </div>

            <div className='btn-group'>
                <label className='label_lg'> Ring Finger Angle
                    <input autoComplete='off' className='input-text' type='number' name="angles" value={armCommands.angles[3]} onChange={(e) => handleAngleChange(e, 3)} />
                </label> <input autoComplete='off' className='slider' type='range' name="angles" min={-180} max={180} value={armCommands.angles[3]} onChange={(e) => handleAngleChange(e, 3)} />
            </div>

            <div className='btn-group'>
                <label className='label_lg'> Pinky Finger Angle
                    <input autoComplete='off' className='input-text' type='number' name="angles" value={armCommands.angles[4]} onChange={(e) => handleAngleChange(e, 4)} />
                </label>
                <input autoComplete='off' className='slider' type='range' name="angles" min={-180} max={180} value={armCommands.angles[4]} onChange={(e) => handleAngleChange(e, 4)} />
            </div>
        </>
    )

    return (
        <div className='serial'>
            <h2>Arm Control</h2>
            <form className='serial-form' onSubmit={handleSubmit}>
                <label className='label_lg'> Joint Mode</label>
                <div className='btn-group'>
                    <select className='input-text' name='mode' value={armCommands.mode} onChange={handleChange}>
                        <option value="J">Joint</option>
                        <option value="H">Hand</option>
                    </select>
                    <button className='btn btn__primary' onClick={() => setArmCommands({ ...armCommands, mode: "J" })}>Joint</button>
                    <button className='btn btn__primary' onClick={() => setArmCommands({ ...armCommands, mode: "H", angles: [0, 0, 0, 0, 0] })}>Hand</button>
                </div>
                {armCommands.mode === "J" && JointModeView}
                {armCommands.mode === "H" && HandModeView}
                <button className='btn btn__primary btn__lg btn-send' type="submit">Send</button>
            </form>
        </div>
    )
}
