export interface DriveMapping {
    speed: number;
    angle: number;
    enable_speed: number;
    spin_mode: number;
    translate_mode: number;
    drive_mode: number;
    wheel_orientation_0: number;
    wheel_orientation_1: number;
    wheel_orientation_2: number;
}

export class Xbox360 implements DriveMapping {
    speed = 1;                  // left stick up/down
    angle = 2;                  // right stick left/right
    enable_speed = 7;           // right bumper
    spin_mode = 2;              // X
    translate_mode = 3;         // Y
    drive_mode = 1;             // B
    wheel_orientation_0 = 14;   // D-Pad Left
    wheel_orientation_1 = 12;   // D-Pad Up
    wheel_orientation_2 = 15;   // D-Pad Right
}

export class Logitech3DPro implements DriveMapping {
    speed = 1;                  // stick up/down
    angle = 5;                  // stick twist left/right
    enable_speed = 0;           // trigger
    spin_mode = 7;              // button labeled 8
    translate_mode = 9;         // button label 10
    drive_mode = 11;            // button labeled 12
    wheel_orientation_0 = 6;    // button labeled 7
    wheel_orientation_1 = 8;    // button labeled 9
    wheel_orientation_2 = 10;   // button labeled 11
}