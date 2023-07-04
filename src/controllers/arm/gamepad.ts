import { ArmCommandDTO } from '../../util/command-dto';
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
} from '../../util/constants';

function clamp(num: number, min: number, max: number) :number {
    return Math.min(Math.max(num, min), max);
}
export interface ArmGamePad {
    gamepadInput: {[key: string]: number};

    getRotundaAngle(commands: ArmCommandDTO);
    getShoulderAngle(commands: ArmCommandDTO);
    getElbowAngle(commands: ArmCommandDTO);
    getWristPitchAngle(commands: ArmCommandDTO);
    getWristRollAngle(commands: ArmCommandDTO); 
    getEndEffectorAngle(commands: ArmCommandDTO);
}

export class Xbox360 implements ArmGamePad {

    constructor(gamepad: Gamepad) {
        this.gamepad = gamepad;
    }

    getRotundaAngle(commands: ArmCommandDTO) { 
        let input = this.gamepad.axes[this.gamepadInput.leftStickHorizontal];

        input = Math.round(input * 0.55);
        input += commands.rotunda_angle;

        input = clamp(input, MIN_ROTUNDA_ANGLE, MAX_ROTUNDA_ANGLE);
        return input;
    }

    getShoulderAngle(commands: ArmCommandDTO) {
        let leftBumperInput = this.gamepad.buttons[this.gamepadInput.leftBumper].value;
        let rightBumperInput = this.gamepad.buttons[this.gamepadInput.rightBumper].value;
        let input = leftBumperInput - rightBumperInput;

        input = Math.round(input);
        input += commands.shoulder_angle;
        input = clamp(input, MIN_SHOULDER_ANGLE, MAX_SHOULDER_ANGLE);
        return input;
    }

    getElbowAngle(commands: ArmCommandDTO) {
        let input = this.gamepad.axes[this.gamepadInput.leftStickVertical];

        input = Math.round(input * 0.55);
        input += commands.elbow_angle;

        input = clamp(input, MIN_ELBOW_ANGLE, MAX_ELBOW_ANGLE);
        return input;
    }

    getWristPitchAngle(commands: ArmCommandDTO) {
        let input = this.gamepad.axes[this.gamepadInput.rightStickVertical];

        input = Math.round(input * 0.55);
        input += commands.wrist_pitch_angle;

        input = clamp(input, MIN_WRIST_PITCH_ANGLE, MAX_WRIST_PITCH_ANGLE);
        return input;
    }

    getWristRollAngle(commands: ArmCommandDTO) {
        let input = this.gamepad.axes[this.gamepadInput.rightStickHorizontal];

        input = Math.round(input * 0.55);
        input += commands.wrist_roll_angle;

        input = clamp(input, MIN_WRIST_ROLL_ANGLE, MAX_WRIST_ROLL_ANGLE);
        return input;
    }

    getEndEffectorAngle(commands: ArmCommandDTO) {
        let leftTriggerInput = this.gamepad.buttons[this.gamepadInput.leftTrigger].value;
        let rightTriggerInput = this.gamepad.buttons[this.gamepadInput.rightTrigger].value;
        let input = leftTriggerInput - rightTriggerInput;

        input = Math.round(input);
        input += commands.end_effector_angle;
        input = clamp(input, MIN_END_EFFECTOR_ANGLE, MAX_END_EFFECTOR_ANGLE);
        return input;
    }

    gamepadInput: { [key: string]: number; } = {
        leftStickHorizontal: 0,
        leftTrigger: 6,
        rightTrigger: 7,
        leftStickVertical: 1,
        rightStickHorizontal: 2,
        rightStickVertical: 3,
        leftBumper: 4,
        rightBumper: 5
    }

    private gamepad: Gamepad;
}
