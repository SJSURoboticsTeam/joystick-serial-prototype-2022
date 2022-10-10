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
    mode: string;
    angles: number[];
}