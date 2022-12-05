export interface DriveCommandDTO {
    heartbeat_count: number;
    is_operational: number;
    wheel_orientation: number;
    drive_mode: string;
    speed: number;
    angle: number;
}

export interface ArmCommandDTO {
    heartbeat_count: number;
    is_operational: number;
    mode: string;
    angles: number[];
}

export function DriveCommandStringFormat(commands: DriveCommandDTO): string {
    return `{"HB":${commands.heartbeat_count},"IO":${commands.is_operational},"WO":${commands.wheel_orientation},"DM":"${commands.drive_mode}","CMD":[${commands.speed},${commands.angle}]}`;
};

export function ArmCommandStringFormat(commands: ArmCommandDTO): string {
    return `{"heartbeat_count":${commands.heartbeat_count},"is_operational":${commands.is_operational},"mode":"${commands.mode}","angles":[${commands.angles}]}`;
}