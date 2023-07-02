
export interface ArmGamePad {
    rotunda_control_index: number;
    shoulder_control_index: number;
    elbow_control_index: number;
    wrist_roll_control_index: number;
    wrist_pitch_control_index: number;
    end_effector_control_index: number;
    
    getRotundaAngle();
    getShoulderAngle();
    getElbowAngle();
    getWristPitchAngle();
    getWristRollAngle(); 
    getEndEffectorAngle();
}

export class Xbox360 implements ArmGamePad {

    constructor(gamepad: Gamepad) {
        this.gamepad = gamepad;
    }

    getRotundaAngle() {
        return (this.gamepad.axes[this.rotunda_control_index]);
    }

    getShoulderAngle() {
        return this.gamepad.buttons[this.shoulder_control_index].value;
    }

    getElbowAngle() {
        return (this.gamepad.axes[this.elbow_control_index]);
    }

    getWristPitchAngle() {
        return (this.gamepad.axes[this.wrist_pitch_control_index])  
    }

    getWristRollAngle() {
        return (this.gamepad.axes[this.wrist_roll_control_index]);
    }

    getEndEffectorAngle() {
        return this.gamepad.buttons[this.end_effector_control_index].value;
    }

    rotunda_control_index = 0;          // left stick left/right
    shoulder_control_index = 6;         // left trigger
    elbow_control_index = 1;            // left stick up/down
    wrist_roll_control_index = 2;       // right stick left/right
    wrist_pitch_control_index = 3;     // right stick up/down
    end_effector_control_index = 7;     // right trigger
    private gamepad: Gamepad;
}
