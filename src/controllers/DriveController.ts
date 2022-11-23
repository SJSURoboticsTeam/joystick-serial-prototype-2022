import { DriveCommand } from "../dto/commands";

export abstract class DriveController {
    constructor(startCommands: DriveCommand) {
        this.commands = startCommands;
    };
    abstract getWheelOrientation(): number;
    abstract getMode(): string;
    abstract getSpeed(): number;
    abstract getAngle(): number;

    commands: DriveCommand;
}