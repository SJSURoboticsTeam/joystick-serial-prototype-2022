export interface DriveCommandDTO {
    HB: number; // heartbeat count
    IO: number; // is operational
    WO: number; // wheel orientation
    DM: string; // drive mode
    CMD: number[]; // [speed, angle]
}

export interface ArmCommandDTO {
    heartbeat_count: number;
    is_operational: number;
    mode: string;
    angles: number[];
}

export function DriveCommandStringFormat(commands: DriveCommandDTO): string {
    return `{"HB":${commands.HB},"IO":${commands.IO},"WO":${commands.WO},"DM":"${commands.DM}","CMD":[${commands.CMD}]}`;
};

export function ArmCommandStringFormat(commands: ArmCommandDTO): string {
    return `{"heartbeat_count":${commands.heartbeat_count},"is_operational":${commands.is_operational},"mode":"${commands.mode}","angles":[${commands.angles}]}`;
}