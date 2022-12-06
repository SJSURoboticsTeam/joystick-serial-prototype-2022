import { MAX_DRIVE_ANGLE, MAX_TRANSLATE_ANGLE, DEFAULT_DRIVE_COMMANDS } from "../../util/constants";
import { DriveCommandDTO } from "../../util/formats";
import { DriveMapping, Xbox360, Logitech3DPro } from "./mappings";

export default class DriveController {
    constructor(gamepad: Gamepad) {
        this.gamepad = gamepad;
        const gamepadId = gamepad.id.toLocaleLowerCase();
        if (gamepadId.includes('extreme 3d') || gamepadId.includes('3d pro')) {
            this.mappings = new Logitech3DPro();
        }
        if (gamepadId.includes('xbox') || gamepadId.includes('microsoft')) {
            this.mappings = new Xbox360();
        }
    }

    public getCommands(): DriveCommandDTO {
        this.getMode();
        this.getSpeed();
        this.getAngle();
        this.getWheelOrientation();
        return this.command;
    }

    private getMode() {
        if (this.gamepad?.buttons[this.mappings.spin_mode]?.pressed) {
            this.command.drive_mode = 'S';
        }
        if (this.gamepad?.buttons[this.mappings.translate_mode]?.pressed) {
            this.command.drive_mode = 'T';
        }
        if (this.gamepad?.buttons[this.mappings.drive_mode]?.pressed) {
            this.command.drive_mode = 'D';
        }
    }

    private getSpeed() {
        const throttleSpeed = parseInt((this.gamepad?.axes[this.mappings.speed] * -20).toFixed(0)) * 5;
        this.command.speed = this.gamepad?.buttons[this.mappings.enable_speed].pressed ? throttleSpeed : 0;
    }

    private getAngle() {
        switch (this.command.drive_mode) {
            case 'S':
                this.command.angle = 0;
                break;
            case 'T':
                this.command.angle = parseInt((this.gamepad?.axes[this.mappings.angle] * MAX_TRANSLATE_ANGLE).toFixed(0));
                break;
            case 'D':
                this.command.angle = parseInt((this.gamepad?.axes[this.mappings.angle] * MAX_DRIVE_ANGLE).toFixed(0));
                break;
            default:
                this.command.angle = 0;
                break;
        }
    }

    private getWheelOrientation() {
        if (this.gamepad?.buttons[this.mappings.wheel_orientation_0]?.pressed) {
            this.command.wheel_orientation = 0;
        }
        if (this.gamepad?.buttons[this.mappings.wheel_orientation_1]?.pressed) {
            this.command.wheel_orientation = 1;
        }
        if (this.gamepad?.buttons[this.mappings.wheel_orientation_2]?.pressed) {
            this.command.wheel_orientation = 2;
        }
    }

    private gamepad: Gamepad;
    private mappings: DriveMapping;
    private command: DriveCommandDTO = DEFAULT_DRIVE_COMMANDS;
}