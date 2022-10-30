export interface DriveFormat {
    HB: number;
    IO: number;
    WO: number;
    DM: string;
    CMD: number[];
}

export interface ArmFormat {
    heartbeat_count: number;
    is_operational: number;
    mode: string;
    angles: number[];
}