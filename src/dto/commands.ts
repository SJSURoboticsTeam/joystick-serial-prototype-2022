export interface DriveFormat {
    heartbeat_count: number;
    is_operational: number;
    wheel_orientation: number;
    drive_mode: string;
    speed: number;
    angle: number;
}

export interface ArmFormat {
    heartbeat_count: number;
    is_operational: number;
    speed: number;
    joint_mode: string;
    joint_angles: number[];
    hand_mode: string;
    hand_angles: number[];
}