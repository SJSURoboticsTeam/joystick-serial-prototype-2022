import { DEFAULT_ARM_COMMANDS, MAX_ELBOW_ANGLE, MAX_FINGER_ANGLE, MAX_ROTUNDA_ANGLE, MAX_RR9_ANGLE, MAX_SHOULDER_ANGLE, MAX_TRANSLATE_ANGLE, MAX_WRIST_PITCH_ANGLE, MAX_WRIST_ROLL_ANGLE } from "../../util/constants";
import { ArmCommandDTO } from "../../util/formats";
import { Xbox360ControllerArmMapping } from "./mapping";

export default class Arm {
    constructor(gamepad: Gamepad) {
        this.gamepad = gamepad;
    }

    public getCommands(): ArmCommandDTO {
        this.getMode(); // make sure to set the mode first since it affects the angle
        this.getFirstAngle();
        this.getShoulderAngle();
        this.getElbowAngle();
        this.getWristPitchAngle();
        this.getWristRollAngle();
        return this.command;
    }

    private getMode() {
        if (this.gamepad.buttons[Xbox360ControllerArmMapping.joint_mode].pressed) {
            this.command.mode = "J";
        }
        if (this.gamepad.buttons[Xbox360ControllerArmMapping.hand_mode].pressed) {
            this.command.mode = "H";
        }
        if (this.gamepad.buttons[Xbox360ControllerArmMapping.rr9_mode].pressed) {
            this.command.mode = "R";
        }
    }

    private getFirstAngle() {
        const maxAngle = this.command.mode === "J" ? MAX_ROTUNDA_ANGLE : this.command.mode === "H" ? MAX_FINGER_ANGLE : MAX_RR9_ANGLE;
        let angle = parseInt((this.gamepad.axes[Xbox360ControllerArmMapping.rotunda_angle] * maxAngle).toFixed(0));
        angle = this.command.mode === "R" && angle < 0 ? 0 : angle;
        this.command.angles[0] = angle;
    }

    private getShoulderAngle() {
        const maxAngle = this.command.mode === "J" ? MAX_SHOULDER_ANGLE : MAX_FINGER_ANGLE;
        this.command.angles[1] = parseInt((this.gamepad.axes[Xbox360ControllerArmMapping.shoulder_angle] * maxAngle).toFixed(0));
    }

    private getElbowAngle() {
        const maxAngle = this.command.mode === "J" ? MAX_ELBOW_ANGLE : MAX_FINGER_ANGLE;
        this.command.angles[2] = parseInt((this.gamepad.axes[Xbox360ControllerArmMapping.elbow_angle] * maxAngle).toFixed(0));
    }

    private getWristPitchAngle() {
        const maxAngle = this.command.mode === "J" ? MAX_WRIST_PITCH_ANGLE : MAX_FINGER_ANGLE;
        const negativeWristPitchAngle: number = (this.gamepad?.buttons[Xbox360ControllerArmMapping.wrist_negative_pitch_angle]?.value) ? parseInt((-(this.gamepad?.buttons[Xbox360ControllerArmMapping.wrist_negative_pitch_angle]?.value) * maxAngle).toFixed(0)) : 0;
        const positiveWristPitchAngle: number = (this.gamepad?.buttons[Xbox360ControllerArmMapping.wrist_positive_pitch_angle]?.value) ? parseInt((-(this.gamepad?.buttons[Xbox360ControllerArmMapping.wrist_positive_pitch_angle]?.value) * -maxAngle).toFixed(0)) : 0;
        this.command.angles[3] = positiveWristPitchAngle + negativeWristPitchAngle;
    }

    private getWristRollAngle() {
        const maxAngle = this.command.mode === "J" ? MAX_WRIST_ROLL_ANGLE : MAX_FINGER_ANGLE;
        this.command.angles[4] = parseInt((this.gamepad.axes[Xbox360ControllerArmMapping.wrist_roll_angle] * MAX_WRIST_ROLL_ANGLE).toFixed(0));
    }

    private gamepad: Gamepad;
    private command: ArmCommandDTO = DEFAULT_ARM_COMMANDS;

}