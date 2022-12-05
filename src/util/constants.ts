import { DriveCommandDTO, ArmCommandDTO } from "./formats";

export const DEFAULT_DRIVE_COMMANDS: DriveCommandDTO = { heartbeat_count: 0, is_operational: 1, drive_mode: 'D', wheel_orientation: 0, speed: 0, angle: 0 };
export const DEFAULT_ARM_COMMANDS: ArmCommandDTO = { heartbeat_count: 0, is_operational: 1, mode: 'J', angles: [0, 0, 0, 0, 0] };

export const MAX_DRIVE_SPEED = 100;
export const MAX_ARM_SPEED = 5;

export const MAX_DRIVE_ANGLE = 12;
export const MAX_TRANSLATE_ANGLE = 45;

export const MAX_ROTUNDA_ANGLE = 90;
export const MAX_SHOULDER_ANGLE = 90;
export const MAX_ELBOW_ANGLE = 180;
export const MAX_WRIST_PITCH_ANGLE = 90;
export const MAX_WRIST_ROLL_ANGLE = 360;

export const MAX_FINGER_ANGLE = 90;

export const MAX_RR9_ANGLE = 150;

export const DRIVE_MODES = [{ label: "Spin", value: "S" }, { label: "Translate", value: "T" }, { label: "Drive", value: "D" }];
export const ARM_MODES = [{ label: "Joint", value: "J" }, { label: "Hand", value: "H" }, { label: "RR9", value: "R" }];
export const WHEEL_ORIENTATIONS = [{ label: "0", value: 0 }, { label: "1", value: 1 }, { label: "2", value: 2 }];