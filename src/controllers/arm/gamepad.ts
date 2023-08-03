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

export class LogitechExtreme implements ArmGamePad {

    constructor(gamepad: Gamepad) {
        this.gamepad = gamepad;
    }

    getShoulderAngle(commands: ArmCommandDTO) {
        let input = this.gamepad.axes[this.gamepadInput.joystickVertical];

        input = Math.round(input * 0.55);
        input = commands.shoulder_angle - input;

        input = clamp(input, MIN_SHOULDER_ANGLE, MAX_SHOULDER_ANGLE);
        return input;
    }

    getElbowAngle(commands: ArmCommandDTO) {
        let input = this.gamepad.axes[this.gamepadInput.thumbJoystickVertical];
        console.log(input)

        if (input == this.gamepadInput.thumbUp)
            input = 1;
        else if (input == this.gamepadInput.thumbDown)
            input = -1;
        else
            input = 0;
        input += commands.elbow_angle;
        input = clamp(input, MIN_ELBOW_ANGLE, MAX_ELBOW_ANGLE);
        return input;
    }

    getRotundaAngle(commands: ArmCommandDTO) {
        let  joystickTriggerInput = this.gamepad.buttons[this.gamepadInput.joystickTrigger].value;

        if (joystickTriggerInput == 1) {
            let input = this.gamepad.axes[this.gamepadInput.joystickRotate];

            input = Math.round(input * 0.55);
            input += commands.rotunda_angle;

            input = clamp(input, MIN_ROTUNDA_ANGLE, MAX_ROTUNDA_ANGLE);
            return input;
        } else return commands.rotunda_angle;
    }

    getWristPitchAngle(commands: ArmCommandDTO) {
        let input = this.gamepad.axes[this.gamepadInput.rudder];
        return input * MAX_WRIST_PITCH_ANGLE;
    }

    getWristRollAngle(commands: ArmCommandDTO) {
        let button6 = this.gamepad.buttons[this.gamepadInput.button6].value;
        let button5 = this.gamepad.buttons[this.gamepadInput.button5].value;
        let input = button6 - button5;

        input = Math.round(input);
        input += commands.wrist_roll_angle;
        input = clamp(input, MIN_WRIST_ROLL_ANGLE, MAX_WRIST_ROLL_ANGLE);
        return input;
    }
    
    getEndEffectorAngle(commands: ArmCommandDTO) {
        let button4 = this.gamepad.buttons[this.gamepadInput.button4].value;
        let button3 = this.gamepad.buttons[this.gamepadInput.button3].value;
        let input = button4 - button3;

        input = Math.round(input);
        input += commands.end_effector_angle;
        input = clamp(input, MIN_END_EFFECTOR_ANGLE, MAX_END_EFFECTOR_ANGLE);
        return input;
    }
    gamepadInput: { [key: string]: number; } = {
        joystickVertical: 1,
        thumbJoystickVertical: 9,
        thumbUp: -1,
        thumbDown: 0.14285719394683838,
        joystickRotate: 5,
        joystickTrigger: 0,
        rudder: 6,
        button3: 2,
        button4: 3,
        button5: 4,
        button6: 5,
    }

    private gamepad: Gamepad;
}

// ThrustMaster

// Thrust on Axis 2. Forward goes -1, bacwards go 1

//Thrust toggle thing Axis 6, left is -1, right is 1

