import React from "react";
import{useState, useRef} from "react";
import DriveController from "../../controllers/drive/controller";
import { DriveCommandDTO } from "../../util/command-dto";
import { DEFAULT_DRIVE_COMMANDS } from "../../util/constants";
import { driveStringFormat } from "../../util/command-formats";
import { MAX_TRANSLATE_ANGLE } from "../../util/constants";
import TextSliderInput from "../Forms/TextSliderInput";
import { Style } from "util";
export default function WheelAngle({commands}){
    const [angle1, setAngle1] = useState(0)
    const [angle2, setAngle2] = useState(0)
    const [angle3, setAngle3] = useState(0)

    const W1Style = {
        width: '50px',
        height: '100px',
        backgroundColor: 'red',
        transform:`rotate(${angle1}deg)`,
        translate: '300px'
   };

   const W2Style = {
        width: '50px',
        height: '100px',
        backgroundColor: 'red',
        transform:`rotate(${angle2}deg)`,
        translate: '0px 200px'
    };

    const W3Style = {
        width: '50px',
        height: '100px',
        backgroundColor: 'red',
        transform:`rotate(${angle3}deg)`,
        translate: '600px 100px'
    };

    function handleChange(e) {
        switch(e.target.name){
            case 'angle1': 
                setAngle1(e.target.value)
                break;
            case 'angle2':
                setAngle2(e.target.value)
                break;
            case 'angle3':
                setAngle3(e.target.value)
                break;
        }
    }

    return(
        <div>
            <TextSliderInput
                name='angle1'
                label='angle1'
                min={-MAX_TRANSLATE_ANGLE}
                max={MAX_TRANSLATE_ANGLE}
                value={angle1}
                onChange={handleChange}
            />
            <TextSliderInput
                name='angle2'
                label='angle2'
                min={-MAX_TRANSLATE_ANGLE}
                max={MAX_TRANSLATE_ANGLE}
                value={angle2}
                onChange={handleChange}
            />
            <TextSliderInput
                name='angle3'
                label='angle3'
                min={-MAX_TRANSLATE_ANGLE}
                max={MAX_TRANSLATE_ANGLE}
                value={angle3}
                onChange={handleChange}
            />
        <div className="two-d">
            <div className="wheelAngle">
                Drive Angle1: {angle1}
                Drive Angle2: {angle2}
                Drive Angle3: {angle3}
            </div>
            <div className="Wheel" style={W1Style}/>
            <div className="Whee2" style={W2Style}/>
            <div className="Whee3" style={W3Style}/>
        </div>
    </div>
    );
}