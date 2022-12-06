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
    speed: number;
    rotunda_angle: number;
    shoulder_angle: number;
    elbow_angle: number;
    wrist_pitch_angle: number;
    wrist_roll_angle: number;
    end_effector_angle: number;
}

export function DriveStringFormat(commands: DriveCommandDTO): string {
    return `{"HB":${commands.heartbeat_count},"IO":${commands.is_operational},"WO":${commands.wheel_orientation},"DM":"${commands.drive_mode}","CMD":[${commands.speed},${commands.angle}]}`;
};

export function ArmStringFormat(commands: ArmCommandDTO): string {
    return `{"heartbeat_count":${commands.heartbeat_count},"is_operational":${commands.is_operational},"speed":"${commands.speed}","angles":[${commands.rotunda_angle},${commands.shoulder_angle},${commands.elbow_angle},${commands.wrist_pitch_angle},${commands.wrist_roll_angle},${commands.end_effector_angle}]}`;
}