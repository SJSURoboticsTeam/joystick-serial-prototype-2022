import { useEffect, useRef, useState } from 'react'
import { useGamepads } from 'react-gamepads';
import { ArmGamePad, LogitechExtreme, Xbox360 } from '../controllers/arm/gamepad';
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
import { TextSliderInput, FooterButtons } from './Forms/ControlForm';
import { ArmCommandDTO } from '../util/command-dto';
import { armStringFormat } from '../util/command-formats';

export default function ArmSystem({ commands }) {
    const [gamepad, setGamepads] = useState<Gamepad>();
    const [armCommands, setArmCommands] = useState<ArmCommandDTO>(DEFAULT_ARM_COMMANDS);
    const gamepadRef = useRef(gamepad);
    const commandsRef = useRef(armCommands);
    
    useGamepads(gamepads => {
        if (gamepads[0]) {
            setGamepads(gamepads[0]);
        }
    });

    useEffect(() => {
        gamepadRef.current = gamepad;
    }, [gamepad]);

    useEffect(() => {
        commandsRef.current = armCommands;
    }, [armCommands]);

    useEffect(() => {
        const interval = setInterval(() => {
            if(getGamePad()) {updateController();}
        }, 125);
        return () => clearInterval(interval);
    }, []);

    function updateCommands(newCommands) {
        commands.current = armStringFormat(newCommands);
        setArmCommands(prev => ({...prev, ...newCommands}));
    }

    function handleChange(e) {
        const newCommands = { ...armCommands, [e.target.name]: e.target.value };
        updateCommands(newCommands);
    }

    function resetCommands() {
        updateCommands(DEFAULT_ARM_COMMANDS);
    }

    function updateController() {
        updateCommands({ ...getCommands() });
    }

    function getCommands(): ArmCommandDTO {
        let controller = getGamePad();
        if (!controller) {
            console.log('controller model not supported')
            return commandsRef.current;
        }

        let currentCommands = commandsRef.current;
        let newCommands = DEFAULT_ARM_COMMANDS;

        newCommands.rotunda_angle = controller.getRotundaAngle(currentCommands);
        newCommands.shoulder_angle = controller.getShoulderAngle(currentCommands);
        newCommands.elbow_angle = controller.getElbowAngle(currentCommands);
        newCommands.wrist_roll_angle = controller.getWristRollAngle(currentCommands);
        newCommands.wrist_pitch_angle = controller.getWristPitchAngle(currentCommands);
        newCommands.end_effector_angle = controller.getEndEffectorAngle(currentCommands);
        delete newCommands.speed;
        return newCommands;
    }

    function getGamePad() {
        if (!gamepadRef.current) {
            console.log('no controller');
            return null
        }

        const gamePadID = gamepadRef.current.id.toLowerCase();

        if (gamePadID.includes('xbox') || gamePadID.includes('microsoft')) {
            return new Xbox360(gamepadRef.current);
        }

        else if (gamePadID.includes('logitech')) {
            return new LogitechExtreme(gamepadRef.current);
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
