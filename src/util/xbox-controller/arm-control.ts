import { ArmInterface } from "../../dto/commands";
import { XboxController } from "./mapping";

export default function getCommands(gamepad: Gamepad): ArmInterface {
    return {
        heartbeat_count: 0,
        is_operational: 0,
        mode: "J",
        angles: [0, 0, 0, 0, 0],
    };
}