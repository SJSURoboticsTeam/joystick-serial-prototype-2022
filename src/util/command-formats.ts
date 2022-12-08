import { ArmCommandDTO, DriveCommandDTO } from "./command-dto";


export function driveStringFormat(commands: DriveCommandDTO): string {
    return `{"HB":${commands.heartbeat_count},"IO":${commands.is_operational},"WO":${commands.wheel_orientation},"DM":"${commands.drive_mode}","CMD":[${commands.speed},${commands.angle}]}`;
};

export function armStringFormat(commands: ArmCommandDTO): string {
    return `{"heartbeat_count":${commands.heartbeat_count},"is_operational":${commands.is_operational},"speed":${commands.speed},"angles":[${commands.rotunda_angle},${commands.shoulder_angle},${commands.elbow_angle},${commands.wrist_pitch_angle},${commands.wrist_roll_angle},${commands.end_effector_angle}]}`;
}