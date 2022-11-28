import { DriveCommand } from "../../dto/commands";
import { DriveController } from "../DriveController";

export class XboxController extends DriveController {
    constructor(startCommands: DriveCommand) {
        super(startCommands);
    }

    getWheelOrientation(): number {
        return 0;
    }

    getMode(): string {
        return 'D';
    }

    getSpeed(): number {
        return 0;
    }

    getAngle(): number {
        return 0;
    }
}