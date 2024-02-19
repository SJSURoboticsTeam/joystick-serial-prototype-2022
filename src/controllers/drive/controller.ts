import { MAX_DRIVE_ANGLE, MAX_TRANSLATE_ANGLE, DEFAULT_DRIVE_COMMANDS } from "../../util/constants";
import { DriveMapping, Xbox360, Logitech3DPro, Default, ThrustMasterHotasX } from "./mappings";
import { DriveCommandDTO } from "../../util/command-dto";

export default class DriveController {
    constructor(gamepad: Gamepad) {
        const gamepadId = gamepad.id.toLocaleLowerCase();
        if (gamepadId.includes('extreme 3d') || gamepadId.includes('3d pro')) {
            this.mappings = new Logitech3DPro();
        }
        if (gamepadId.includes('xbox') || gamepadId.includes('microsoft')) {
            this.mappings = new Xbox360();
        }
        if (gamepadId.includes('thrustmaster') || gamepadId.includes('hotas')) {
            this.mappings = new ThrustMasterHotasX();
        }
        this.gamepad = gamepad;
    }

    public getCommands(currentCommands): DriveCommandDTO {
        this.getMode(currentCommands.drive_mode);
        // this.getSpeed();
        this.getCommand(currentCommands.drive_mode);
        // this.getWheelOrientation(currentCommands.wheel_orientation);
        return this.command;
    }
    private getTranslateAngle() { 
        const xAxis = this.gamepad?.axes[0];
        const yAxis = this.gamepad?.axes[1];
        return Math.floor(xAxis * 80);
    }

    private getTranslateSpeed() {
        const xAxis = this.gamepad?.axes[0];
        const yAxis = this.gamepad?.axes[1];
        
        return Math.floor(Math.sqrt(xAxis * xAxis + yAxis * yAxis) * 40);
    }

    private getMode(currentMode) {
        if (this.gamepad?.buttons[this.mappings.spin_mode]?.pressed) {
            this.command.drive_mode = 'S';
        }
        else if (this.gamepad?.buttons[this.mappings.translate_mode]?.pressed) {
            this.command.drive_mode = 'T';
        }
        else if (this.gamepad?.buttons[this.mappings.drive_mode]?.pressed) {
            this.command.drive_mode = 'D';
        }
        else {
            this.command.drive_mode = currentMode;
        }
    }

    private getBumperSpeed() {
        console.log(this.gamepad?.buttons[this.mappings.speed].value);
        const forwardAxis = this.gamepad?.buttons[this.mappings.speed].value;
        const backwardAxis =  this.gamepad?.buttons[6].value;
        return Math.floor((forwardAxis - backwardAxis) * 40);
    }

    private getCommand(currentMode) {
        switch (currentMode) {
            case 'S':
                this.command.angle = 0;
                this.command.speed = this.getBumperSpeed();
                break;
            case 'T':
                this.command.angle = this.getTranslateAngle();
                this.command.speed = this.getBumperSpeed();
                break;
            case 'D':
                this.command.angle = parseInt((this.gamepad?.axes[this.mappings.angle] * MAX_DRIVE_ANGLE).toFixed(0));
                this.command.speed = this.getBumperSpeed();
                break;
            default:
                this.command.angle = 0;
                break;
        }
    }

    private getWheelOrientation(currentOrientation) {
        if (this.gamepad?.buttons[this.mappings.wheel_orientation_0]?.pressed) {
            this.command.wheel_orientation = 0;
        }
        else if (this.gamepad?.buttons[this.mappings.wheel_orientation_1]?.pressed) {
            this.command.wheel_orientation = 1;
        }
        else if (this.gamepad?.buttons[this.mappings.wheel_orientation_2]?.pressed) {
            this.command.wheel_orientation = 2;
        }
        else {
            this.command.wheel_orientation = currentOrientation;
        }
    }

    private gamepad: Gamepad;
    private mappings: DriveMapping = new Default();
    private command: DriveCommandDTO = DEFAULT_DRIVE_COMMANDS;
}