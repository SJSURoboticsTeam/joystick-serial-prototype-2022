export interface DriveCommandDTO {
    heartbeat_count: number;
    is_operational: number;
    wheel_orientation: number;
    drive_mode: string;
    speed: number;
    angle: number;
    led_status: number;
}

export interface ArmCommandDTO {
    heartbeat_count: number;
    is_operational: number;
    speed: number;
    rotunda_angle: number;
    shoulder_angle: number;
    elbow_angle: number;
    wrist_pitch_angle: number;
    wrist_roll_angle: number;
    end_effector_angle: number;
}

export interface autonomyCommandDTO {
    heartbeat_count: number;
    is_operational: number;
    angle: number;
}