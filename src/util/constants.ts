import { DriveCommandDTO, ArmCommandDTO } from "./formats";

export const MAX_DRIVE_ANGLE = 12;
export const MAX_TRANSLATE_ANGLE = 45;

export const WHEEL_ORIENTATIONS = [{ label: "0", value: 0 }, { label: "1", value: 1 }, { label: "2", value: 2 }];
export const MODES = [{ label: "Spin", value: "S" }, { label: "Translate", value: "T" }, { label: "Drive", value: "D" }];

export const DEFAULT_DRIVE_COMMANDS: DriveCommandDTO = { HB: 0, IO: 1, DM: 'D', WO: 0, CMD: [0, 0] };
export const DEFAULT_ARM_COMMANDS: ArmCommandDTO = { heartbeat_count: 0, is_operational: 1, mode: 'D', angles: [0, 0, 0, 0, 0, 0] };
