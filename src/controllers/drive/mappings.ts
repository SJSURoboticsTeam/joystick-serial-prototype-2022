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

export class Default implements DriveMapping {
    speed = -1;
    angle = -1;
    enable_speed = -1;
    spin_mode = -1;
    translate_mode = -1;
    drive_mode = -1;
    wheel_orientation_0 = -1;
    wheel_orientation_1 = -1;
    wheel_orientation_2 = -1;
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
    angle = 2;                  // stick twist left/right
    enable_speed = 0;           // trigger
    spin_mode = 7;              // button labeled 8
    translate_mode = 9;         // button label 10
    drive_mode = 11;            // button labeled 12
    wheel_orientation_0 = 6;    // button labeled 7
    wheel_orientation_1 = 8;    // button labeled 9
    wheel_orientation_2 = 10;   // button labeled 11
}

export class ThrustMasterHotasX implements DriveMapping {
    speed = 2;                  // stick up/down
    angle = 0;                 // stick twist left/right
    enable_speed = 8;          // button labeled 9
    spin_mode = 4;              // button labeled 4
    translate_mode = 5;         // button labeled 5
    drive_mode = 6;             // button labeled 6
    wheel_orientation_0 = 0;    // trigger
    wheel_orientation_1 = 1;    // button labeled 2
    wheel_orientation_2 = 2;    // button labeled 3
}