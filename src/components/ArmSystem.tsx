import { useEffect, useState } from 'react'
import { useGamepads } from 'react-gamepads';
import { ArmGamePad, Xbox360 } from '../controllers/arm/gamepad';
import {
    DEFAULT_ARM_COMMANDS,
    MIN_ROTUNDA_ANGLE,
    MAX_ROTUNDA_ANGLE,
    MIN_ELBOW_ANGLE,
    MAX_ELBOW_ANGLE,
    MIN_SHOULDER_ANGLE,
    MAX_SHOULDER_ANGLE,
    MIN_WRIST_PITCH_ANGLE,
    MAX_WRIST_PITCH_ANGLE,
    MIN_WRIST_ROLL_ANGLE,
    MAX_WRIST_ROLL_ANGLE,
    MIN_END_EFFECTOR_ANGLE,
    MAX_END_EFFECTOR_ANGLE,
    MIN_ARM_SPEED,
    MAX_ARM_SPEED
} from '../util/constants';
import ArmController from '../controllers/arm/controller';
import { TextSliderInput, FooterButtons } from './Forms/ControlForm';
import { ArmCommandDTO } from '../util/command-dto';
import { armStringFormat } from '../util/command-formats';

export default function ArmSystem({ commands }) {
    const [gamepad, setGamepads] = useState<Gamepad>();
    const [armCommands, setArmCommands] = useState<ArmCommandDTO>(DEFAULT_ARM_COMMANDS);

    useGamepads(gamepads => {
        console.log("called");
        if (gamepads[0]) {
            setGamepads(gamepads[0]);
            console.log("gamepad");
        } else {console.log("no intial gamepad");}
    });

    function updateCommands(newCommands) {
        commands.current = armStringFormat(newCommands);
        setArmCommands(newCommands);
    }

    function handleChange(e) {
        const newCommands = { ...armCommands, [e.target.name]: e.target.value };
        updateCommands(newCommands);
    }

    function resetCommands() {
        updateCommands(DEFAULT_ARM_COMMANDS);
    }
    
    setInterval(updateController, 750);

    function updateController() {
        updateCommands({...getCommands(), speed: armCommands.speed });
        console.log(armCommands.rotunda_angle);
    }

    function getCommands() : ArmCommandDTO {
        let controller = getGamePad();
        if (!controller) {
            console.log('controller model not supported')
            return armCommands;
        }

        let commands = DEFAULT_ARM_COMMANDS;

        commands.rotunda_angle = armCommands.rotunda_angle + controller.getRotundaAngle();
        commands.shoulder_angle = armCommands.shoulder_angle + controller.getShoulderAngle();
        commands.elbow_angle = armCommands.elbow_angle + controller.getElbowAngle();
        commands.wrist_roll_angle = armCommands.wrist_roll_angle + controller.getWristRollAngle();
        commands.wrist_pitch_angle = armCommands.wrist_pitch_angle + controller.getWristPitchAngle();
        commands.end_effector_angle = armCommands.end_effector_angle + controller.getEndEffectorAngle();

        commands.rotunda_angle = Math.min(Math.max(commands.rotunda_angle, MIN_ROTUNDA_ANGLE), MAX_ROTUNDA_ANGLE);
        commands.shoulder_angle = Math.min(Math.max(commands.shoulder_angle, MIN_SHOULDER_ANGLE), MAX_SHOULDER_ANGLE);
        commands.elbow_angle = Math.min(Math.max(commands.elbow_angle, MIN_ELBOW_ANGLE), MAX_ELBOW_ANGLE);
        commands.wrist_roll_angle = Math.min(Math.max(commands.wrist_roll_angle, MIN_WRIST_ROLL_ANGLE), MAX_WRIST_ROLL_ANGLE);
        commands.wrist_pitch_angle = Math.min(Math.max(commands.wrist_pitch_angle, MIN_WRIST_PITCH_ANGLE), MAX_WRIST_PITCH_ANGLE);
        commands.end_effector_angle = Math.min(Math.max(commands.end_effector_angle, MIN_END_EFFECTOR_ANGLE), MAX_END_EFFECTOR_ANGLE);
        return commands;
    }

    function getGamePad() {
        if (!gamepad) {
            console.log("no game pad")
            return null
        }
        const gamePadID = gamepad.id
        console.log(gamePadID);
        if (gamePadID.includes('xbox') || gamePadID.includes('microsoft')) {
            return new Xbox360(gamepad);
        }

        else {return null;}
    }

    return (
        <div className='serial'>
            <h2>Arm System</h2>
            <form className='serial-form' onSubmit={(e) => { e.preventDefault(); console.log(commands.current) }}>
                <TextSliderInput
                    name='speed'
                    label='Speed'
                    min={MIN_ARM_SPEED}
                    max={MAX_ARM_SPEED}
                    value={armCommands.speed}
                    onChange={handleChange}
                />
                <TextSliderInput
                    name='rotunda_angle'
                    label="Rotunda Angle"
                    min={MIN_ROTUNDA_ANGLE}
                    max={MAX_ROTUNDA_ANGLE}
                    value={armCommands.rotunda_angle}
                    onChange={handleChange} />
                <TextSliderInput
                    name='shoulder_angle'
                    label="Shoulder Angle"
                    min={MIN_SHOULDER_ANGLE}
                    max={MAX_SHOULDER_ANGLE}
                    value={armCommands.shoulder_angle}
                    onChange={handleChange} />
                <TextSliderInput
                    name='elbow_angle'
                    label="Elbow Angle"
                    min={MIN_ELBOW_ANGLE}
                    max={MAX_ELBOW_ANGLE}
                    value={armCommands.elbow_angle}
                    onChange={handleChange} />
                <TextSliderInput
                    name='wrist_pitch_angle'
                    label="Wrist Pitch Angle"
                    min={MIN_WRIST_PITCH_ANGLE}
                    max={MAX_WRIST_PITCH_ANGLE}
                    value={armCommands.wrist_pitch_angle}
                    onChange={handleChange} />
                <TextSliderInput
                    name='wrist_roll_angle'
                    label="Wrist Roll Angle"
                    min={MIN_WRIST_ROLL_ANGLE}
                    max={MAX_WRIST_ROLL_ANGLE}
                    value={armCommands.wrist_roll_angle}
                    onChange={handleChange} />
                <TextSliderInput
                    name='end_effector_angle'
                    label="End Effector Angle"
                    min={MIN_END_EFFECTOR_ANGLE}
                    max={MAX_END_EFFECTOR_ANGLE}
                    value={armCommands.end_effector_angle}
                    onChange={handleChange} />
                <FooterButtons onResetClick={resetCommands} />
            </form>
        </div>
    )
}
