import { MAX_DRIVE_ANGLE, MAX_TRANSLATE_ANGLE, DEFAULT_DRIVE_COMMANDS } from "../../util/constants";
import { DriveCommandDTO } from "../../util/formats";
import { XboxController } from "./mapping";

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
        if (this.gamepad?.buttons[XboxController.drive_mode]?.pressed) {
            this.command.DM = 'D';
        }
        if (this.gamepad?.buttons[XboxController.translate_mode]?.pressed) {
            this.command.DM = 'T';
        }
        if (this.gamepad?.buttons[XboxController.spin_mode]?.pressed) {
            this.command.DM = 'S';
        }
    }

    private getSpeed() {
        let speed = parseInt((this.gamepad?.axes[XboxController.speed] * 10).toFixed(0)) * -10;
        this.command.CMD[0] = speed;
    }

    private getAngle() {
        switch (this.command.DM) {
            case 'S':
                this.command.CMD[1] = 0;
                break;
            case 'T':
                this.command.CMD[1] = parseInt((this.gamepad?.axes[XboxController.angle] * MAX_TRANSLATE_ANGLE).toFixed(0));
                break;
            case 'D':
                this.command.CMD[1] = parseInt((this.gamepad?.axes[XboxController.angle] * MAX_DRIVE_ANGLE).toFixed(0));
                break;
            default:
                this.command.CMD[1] = 0;
                break;
        }
    }

    private getWheelOrientation() {
        if (this.gamepad?.buttons[XboxController.wheel_orientation_0]?.pressed) {
            this.command.WO = 0;
        }
        if (this.gamepad?.buttons[XboxController.wheel_orientation_1]?.pressed) {
            this.command.WO = 1;
        }
        if (this.gamepad?.buttons[XboxController.wheel_orientation_2]?.pressed) {
            this.command.WO = 2;
        }
    }

    private gamepad: Gamepad;
    private command: DriveCommandDTO = DEFAULT_DRIVE_COMMANDS;
}