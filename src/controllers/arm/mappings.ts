export interface ArmMapping {
    rotunda_angle: number;
    shoulder_angle: number;
    elbow_angle: number;
    wrist_roll_angle: number;
    wrist_pitch_angle: number;
    end_effector_angle: number;
}

export class Xbox360 implements ArmMapping {
    rotunda_angle = 0;          // left stick left/right
    shoulder_angle = 6;         // left trigger
    elbow_angle = 1;            // left stick up/down
    wrist_roll_angle = 2;       // right stick left/right
    wrist_pitch_angle = 3;     // right stick up/down
    end_effector_angle = 7;     // right trigger
}