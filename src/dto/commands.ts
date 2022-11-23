export interface DriveCommand {
    HB: number; // heartbeat count
    IO: number; // is operational
    WO: number; // wheel orientation
    DM: string; // drive mode
    CMD: number[]; // [speed, angle]
}

export interface ArmCommand {
    heartbeat_count: number;
    is_operational: number;
    mode: string;
    angles: number[];
}

export function DriveCommandStringFormat(commands: DriveCommand): string {
    return `{"HB":${commands.HB},"IO":${commands.IO},"WO":${commands.WO},"DM":"${commands.DM}","CMD":[${commands.CMD}]}`;
};

export function ArmCommandStringFormat(commands: ArmCommand): string {
    return `{"heartbeat_count":${commands.heartbeat_count},"is_operational":${commands.is_operational},"mode":"${commands.mode}","angles":[${commands.angles}]}`;
}

export const DEFAULT_DRIVE_COMMANDS: DriveCommand = { HB: 0, IO: 1, DM: 'D', WO: 0, CMD: [0, 0] };
export const DEFAULT_ARM_COMMANDS: ArmCommand = { heartbeat_count: 0, is_operational: 1, mode: 'D', angles: [0, 0, 0, 0, 0, 0] };