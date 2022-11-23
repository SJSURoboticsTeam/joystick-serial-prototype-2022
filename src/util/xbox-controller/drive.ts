import { XboxController } from "./mapping";
import { DriveCommand, DriveCommandStringFormat } from "../../dto/commands";

const commands: DriveCommand = {
    HB: 0,
    IO: 1,
    WO: 0,
    DM: "drive",
    CMD: [0, 0]
};

export default function XboxDriveControl(gamepad: Gamepad) {
    return commands;
}

function getXboxSpeed(gamepad: Gamepad): number {
    const newSpeed = -parseInt((gamepad?.axes[XboxController.left_analog_y] * 10).toFixed(0));
    return newSpeed * 10;
}

function getXboxAngle(gamepad: Gamepad): number {
    if (commands.DM === 'S') return 0;
    else if (commands.DM === 'T')
        return parseInt(
            (gamepad?.axes[XboxController.right_analog_x] * 45).toFixed(0)
        );
    return parseInt(
        (gamepad?.axes[XboxController.right_analog_x] * 12).toFixed(0)
    );
}

function getXboxDriveMode(gamepad: Gamepad): string {
    return gamepad?.buttons[XboxController.x]?.value
        ? 'S'
        : gamepad?.buttons[XboxController.y]?.value
            ? 'T'
            : gamepad?.buttons[XboxController.b]?.value
                ? 'D'
                : commands.DM;
}

function getXboxWheelOrientation(gamepad: Gamepad): number {
    return gamepad?.buttons[XboxController.d_pad_left]?.value
        ? 0
        : gamepad?.buttons[XboxController.d_pad_up]?.value
            ? 1
            : gamepad?.buttons[XboxController.d_pad_right]?.value
                ? 2
                : commands.WO;
}