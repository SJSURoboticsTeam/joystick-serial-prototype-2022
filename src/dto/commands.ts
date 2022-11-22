export interface DriveInterface {
    HB: number; // heartbeat count
    IO: number; // is operational
    WO: number; // wheel orientation
    DM: string; // drive mode
    CMD: number[]; // [speed, angle]
}

export function DriveFormat(commands: DriveInterface) {
    // commands.current = `{"HB":${driveCommands.HB},"IO":${driveCommands.IO},"WO":${driveCommands.WO},"DM":"${driveCommands.DM}","CMD":[${driveCommands.CMD}]}`;
    return `{"HB":${commands.HB},"IO":${commands.IO},"WO":${commands.WO},"DM":"${commands.DM}","CMD":[${commands.CMD}]}`;
};


export interface ArmInterface {
    heartbeat_count: number;
    is_operational: number;
    mode: string;
    angles: number[];
}

export function ArmFormat(commands: ArmInterface) {
    return `{"heartbeat_count":${commands.heartbeat_count},"is_operational":${commands.is_operational},"mode":"${commands.mode}","angles":[${commands.angles}]}`;
}
