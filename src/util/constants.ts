import { ArmCommandDTO, DriveCommandDTO } from "./command-dto";

export const DEFAULT_DRIVE_COMMANDS: DriveCommandDTO = {
    heartbeat_count: 0,
    is_operational: 1,
    drive_mode: 'D',
    wheel_orientation: 0,
    speed: 0,
    angle: 0
};

export const DEFAULT_ARM_COMMANDS: ArmCommandDTO = {
    heartbeat_count: 0,
    is_operational: 1,
    speed: 1,
    rotunda_angle: 0,
    shoulder_angle: 0,
    elbow_angle: 0,
    wrist_pitch_angle: 0,
    wrist_roll_angle: 0,
    end_effector_angle: 0
};

export const DRIVE_MODES = [
    { label: "Spin", value: "S" },
    { label: "Translate", value: "T" },
    { label: "Drive", value: "D" }
];

export const WHEEL_ORIENTATIONS = [
    { label: "0", value: 0 },
    { label: "1", value: 1 },
    { label: "2", value: 2 }
];

export const NUMBER_OF_DRIVE_KEYS = 5;
export const NUMBER_OF_ARM_KEYS = 4;

export const MIN_DRIVE_SPEED = -100;
export const MAX_DRIVE_SPEED = 100;

export const MAX_DRIVE_ANGLE = 12;
export const MAX_TRANSLATE_ANGLE = 45;

export const MIN_ARM_SPEED = 1;
export const MAX_ARM_SPEED = 5;

export const MIN_ROTUNDA_ANGLE = -90;
export const MAX_ROTUNDA_ANGLE = 90;

export const MIN_SHOULDER_ANGLE = 0;
export const MAX_SHOULDER_ANGLE = 90;

export const MIN_ELBOW_ANGLE = -180;
export const MAX_ELBOW_ANGLE = 180;

export const MIN_WRIST_PITCH_ANGLE = -90;
export const MAX_WRIST_PITCH_ANGLE = 90;

export const MIN_WRIST_ROLL_ANGLE = -360;
export const MAX_WRIST_ROLL_ANGLE = 360;

export const MIN_END_EFFECTOR_ANGLE = 0;
export const MAX_END_EFFECTOR_ANGLE = 150;

