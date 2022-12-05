import { useEffect, useState } from 'react'
import { useGamepads } from 'react-gamepads';

import { ArmCommandDTO, ArmCommandStringFormat } from '../util/formats';
import { ARM_MODES, DEFAULT_ARM_COMMANDS, MAX_ELBOW_ANGLE, MAX_FINGER_ANGLE, MAX_ROTUNDA_ANGLE, MAX_RR9_ANGLE, MAX_SHOULDER_ANGLE, MAX_WRIST_PITCH_ANGLE, MAX_WRIST_ROLL_ANGLE } from '../util/constants';
import { DropdownButtonSelector, TextSliderInput, FooterButtons } from './Forms/ControlForm';

import Xbox360ArmControl from '../controllers/xbox-360/arm';

export default function ArmSystem({ commands }) {
    useGamepads(gamepads => { setGamepads(gamepads[0]) }); // will use the first gamepad connected

    const [gamepad, setGamepads] = useState<Gamepad>();
    const [armCommands, setArmCommands] = useState<ArmCommandDTO>(DEFAULT_ARM_COMMANDS);

    async function handleSubmit(e) {
        e.preventDefault();
        commands.current = ArmCommandStringFormat(armCommands);
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
        const gamepadId: string = gamepad?.id.toLowerCase() || "";
        if (gamepadId.includes("microsoft") || gamepadId.includes("xbox")) {
            let xbox: Xbox360ArmControl = new Xbox360ArmControl(gamepad);
            setArmCommands(xbox.getCommands());
        }
    }, [gamepad]);


    useEffect(() => {
        handleSubmit(new Event('submit'));
    }, [armCommands, handleSubmit]);

    useEffect(() => {
        handleSubmit(new Event('submit'));
    }, []);

    const JointModeView = (
        <>
            <TextSliderInput name='rotunda' label="Rotunda Angle" min={-MAX_ROTUNDA_ANGLE} max={MAX_ROTUNDA_ANGLE} value={armCommands.angles[0]} onChange={(e) => handleAngleChange(e, 0)} />
            <TextSliderInput name='shoulder' label="Shoulder Angle" min={-MAX_SHOULDER_ANGLE} max={MAX_SHOULDER_ANGLE} value={armCommands.angles[1]} onChange={(e) => handleAngleChange(e, 1)} />
            <TextSliderInput name='elbow' label="Elbow Angle" min={-MAX_ELBOW_ANGLE} max={MAX_ELBOW_ANGLE} value={armCommands.angles[2]} onChange={(e) => handleAngleChange(e, 2)} />
            <TextSliderInput name='wrist_pitch' label="Wrist Pitch Angle" min={-MAX_WRIST_PITCH_ANGLE} max={MAX_WRIST_PITCH_ANGLE} value={armCommands.angles[3]} onChange={(e) => handleAngleChange(e, 3)} />
            <TextSliderInput name='wrist_roll' label="Wrist Roll Angle" min={-MAX_WRIST_ROLL_ANGLE} max={MAX_WRIST_ROLL_ANGLE} value={armCommands.angles[4]} onChange={(e) => handleAngleChange(e, 4)} />
        </>
    )

    const HandModeView = (
        <>
            <TextSliderInput name='thumb' label="Thumb Finger Angle" min={-MAX_FINGER_ANGLE} max={MAX_FINGER_ANGLE} value={armCommands.angles[0]} onChange={(e) => handleAngleChange(e, 0)} />
            <TextSliderInput name='index' label="Index Finger Angle" min={-MAX_FINGER_ANGLE} max={MAX_FINGER_ANGLE} value={armCommands.angles[1]} onChange={(e) => handleAngleChange(e, 1)} />
            <TextSliderInput name='middle' label="Middle Finger Angle" min={-MAX_FINGER_ANGLE} max={MAX_FINGER_ANGLE} value={armCommands.angles[2]} onChange={(e) => handleAngleChange(e, 2)} />
            <TextSliderInput name='ring' label="Ring Finger Angle" min={-MAX_FINGER_ANGLE} max={MAX_FINGER_ANGLE} value={armCommands.angles[3]} onChange={(e) => handleAngleChange(e, 3)} />
            <TextSliderInput name='pinky' label="Pinky Finger Angle" min={-MAX_FINGER_ANGLE} max={MAX_FINGER_ANGLE} value={armCommands.angles[4]} onChange={(e) => handleAngleChange(e, 4)} />
        </>
    )

    const RR9ModeView = (
        <>
            <TextSliderInput name='rr9' label="RR9 Angle" min={0} max={MAX_RR9_ANGLE} value={armCommands.angles[0]} onChange={(e) => handleAngleChange(e, 0)} />
        </>
    )

    return (
        <div className='serial'>
            <h2>Arm System</h2>
            <form className='serial-form' onSubmit={handleSubmit}>
                <DropdownButtonSelector name='mode' label='Mode' value={armCommands.mode} onChange={handleChange} options={ARM_MODES} />
                {armCommands.mode === "J" && JointModeView}
                {armCommands.mode === "H" && HandModeView}
                {armCommands.mode === "R" && RR9ModeView}
                <FooterButtons onResetClick={() => setArmCommands({ ...DEFAULT_ARM_COMMANDS, mode: armCommands.mode })} />
            </form>
        </div>
    )
}
