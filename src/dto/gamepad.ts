export enum XboxController {
    left_analog_x = 0,
    left_analog_y = 1,
    right_analog_x = 2,
    right_analog_y = 3,

    a = 0,
    b = 1,
    x = 2,
    y = 3,

    left_bumper = 4,
    right_bumper = 5,

    left_trigger = 6,
    right_trigger = 7,

    d_pad_up = 12,
    d_pad_down = 13,
    d_pad_left = 14,
    d_pad_right = 15,

    start = 9,
    back = 8
}

export enum Extreme3DPro {
    roll = 0,
    pitch = 1,
    yaw = 5, // twist motion - sometimes 2/5
    throttle = 6, // sometimes 3/6
    thumb_joystick = 9,

    trigger = 0,
    thumb_btn = 1,
    btn_7 = 6, // wheel orientation 0
    btn_8 = 7, // drive 
    btn_9 = 8, // wheel orientation 1
    btn_10 = 9, // translate 
    btn_11 = 10, // wheel orientation 2
    btn_12 = 11 // spin 
}