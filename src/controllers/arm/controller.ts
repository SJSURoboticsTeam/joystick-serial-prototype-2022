import {
    DEFAULT_ARM_COMMANDS,
    MAX_ROTUNDA_ANGLE,
    MAX_SHOULDER_ANGLE,
    MAX_ELBOW_ANGLE,
    MAX_WRIST_PITCH_ANGLE,
    MAX_WRIST_ROLL_ANGLE,
    MAX_END_EFFECTOR_ANGLE
} from "../../util/constants";
import { ArmMapping, Xbox360 } from "./mappings";
import { ArmCommandDTO } from "../../util/command-dto";

export default class ArmController {
    constructor(gamepad: Gamepad) {
        this.gamepad = gamepad;
        const gamepadId = gamepad.id.toLocaleLowerCase();
        if (gamepadId.includes('xbox') || gamepadId.includes('microsoft')) {
            this.mappings = new Xbox360();
        }
    }

    public getCommands(): ArmCommandDTO {
        this.getRotundaAngle();
        this.getShoulderAngle();
        this.getElbowAngle();
        this.getWristRollAngle();
        this.getWristPitchAngle();
        this.getEndEffectorAngle();
        return this.command;
    }

    private getRotundaAngle() {
        this.command.rotunda_angle = parseInt((this.gamepad.axes[this.mappings.rotunda_angle] * MAX_ROTUNDA_ANGLE).toFixed(0));
    }

    private getShoulderAngle() {
        this.command.shoulder_angle = parseInt((this.gamepad.buttons[this.mappings.shoulder_angle].value * MAX_SHOULDER_ANGLE).toFixed(0));
    }

    private getElbowAngle() {
        this.command.elbow_angle = parseInt((this.gamepad.axes[this.mappings.elbow_angle] * MAX_ELBOW_ANGLE).toFixed(0));
    }

    private getWristPitchAngle() {
        this.command.wrist_pitch_angle = parseInt((this.gamepad.axes[this.mappings.wrist_pitch_angle] * MAX_WRIST_PITCH_ANGLE).toFixed(0));
    }

    private getWristRollAngle() {
        this.command.wrist_roll_angle = parseInt((this.gamepad.axes[this.mappings.wrist_roll_angle] * MAX_WRIST_ROLL_ANGLE).toFixed(0));
    }

    private getEndEffectorAngle() {
        this.command.end_effector_angle = parseInt((this.gamepad.buttons[this.mappings.end_effector_angle].value * MAX_END_EFFECTOR_ANGLE).toFixed(0));
    }

    private gamepad: Gamepad;
    private mappings: ArmMapping;
    private command: ArmCommandDTO = DEFAULT_ARM_COMMANDS;

}