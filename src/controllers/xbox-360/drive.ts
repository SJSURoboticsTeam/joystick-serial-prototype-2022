import { MAX_DRIVE_ANGLE, MAX_TRANSLATE_ANGLE, DEFAULT_DRIVE_COMMANDS } from "../../util/constants";
import { DriveCommandDTO } from "../../util/formats";
import { Xbox360ControllerDriveMapping } from "./mapping";

export default class Drive {
    constructor(gamepad: Gamepad) {
        this.gamepad = gamepad;
    }

    public getCommands(): DriveCommandDTO {
        this.getMode(); // make sure to set the mode first since it affects the angle
        this.getSpeed();
        this.getAngle();
        this.getWheelOrientation();
        return this.command;
    }

    private getMode() {
        if (this.gamepad?.buttons[Xbox360ControllerDriveMapping.drive_mode]?.pressed) {
            this.command.drive_mode = 'D';
        }
        if (this.gamepad?.buttons[Xbox360ControllerDriveMapping.translate_mode]?.pressed) {
            this.command.drive_mode = 'T';
        }
        if (this.gamepad?.buttons[Xbox360ControllerDriveMapping.spin_mode]?.pressed) {
            this.command.drive_mode = 'S';
        }
    }

    private getSpeed() {
        let speed = parseInt((this.gamepad?.axes[Xbox360ControllerDriveMapping.speed] * 10).toFixed(0)) * -10;
        this.command.speed = speed;
    }

    private getAngle() {
        switch (this.command.drive_mode) {
            case 'S':
                this.command.angle = 0;
                break;
            case 'T':
                this.command.angle = parseInt((this.gamepad?.axes[Xbox360ControllerDriveMapping.angle] * MAX_TRANSLATE_ANGLE).toFixed(0));
                break;
            case 'D':
                this.command.angle = parseInt((this.gamepad?.axes[Xbox360ControllerDriveMapping.angle] * MAX_DRIVE_ANGLE).toFixed(0));
                break;
            default:
                this.command.angle = 0;
                break;
        }
    }

    private getWheelOrientation() {
        if (this.gamepad?.buttons[Xbox360ControllerDriveMapping.wheel_orientation_0]?.pressed) {
            this.command.wheel_orientation = 0;
        }
        if (this.gamepad?.buttons[Xbox360ControllerDriveMapping.wheel_orientation_1]?.pressed) {
            this.command.wheel_orientation = 1;
        }
        if (this.gamepad?.buttons[Xbox360ControllerDriveMapping.wheel_orientation_2]?.pressed) {
            this.command.wheel_orientation = 2;
        }
    }

    private gamepad: Gamepad;
    private command: DriveCommandDTO = DEFAULT_DRIVE_COMMANDS;
}