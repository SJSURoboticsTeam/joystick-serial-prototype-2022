import React from "react";
import{useState, useRef, useEffect} from "react";
import DriveController from "../../controllers/drive/controller";
import { DriveCommandDTO } from "../../util/command-dto";
import { DEFAULT_DRIVE_COMMANDS } from "../../util/constants";
import { driveStringFormat } from "../../util/command-formats";
import { MAX_TRANSLATE_ANGLE } from "../../util/constants";
import TextSliderInput from "../Forms/TextSliderInput";
import { Style } from "util";
export default function WheelAngle({commands}){
    const [right, setRight] = useState(0)
    const [left, setLeft] = useState(0)
    const [back, setBack] = useState(0)
    const [angleRover, setAngleRover] = useState(0)

    const [mode, setMode] = useState("Unlock")

    const RStyle = {
        width: '50px',
        height: '100px',
        backgroundColor: 'red',
        transform:`rotate(${right}deg)`,
        translate: '600px',
        borderRadius: "50px 50px 0px 0px"
   };

   const LStyle = {
        width: '50px',
        height: '100px',
        backgroundColor: 'blue',
        transform:`rotate(${left}deg)`,
        translate: '0px -100px',
        borderRadius: "50px 50px 0px 0px"
    };

    const BStyle = {
        width: '50px',
        height: '100px',
        backgroundColor: 'green',
        transform:`rotate(${back}deg)`,
        translate: '300px 250px',
        borderRadius: "50px 50px 0px 0px"
    };

    function handleChange(e) {
        switch(mode)
        {
            case 'Unlock':
                unlockDrive(e.target.name, e.target.value);
                break;
            case 'Drive' :
                if(e.target.name == "angleRover")
                {
                    setAngleRover(e.target.value)
                    let temp = e.target.value
                    handleDrive(temp);
                }
                break;
            case 'Translate' :
                if(e.target.name == "angleRover")
                {
                    setAngleRover(e.target.value);
                    let temp = e.target.value
                    constDrive(temp, temp, temp);
                }
                break;
            case 'Rotate' :
                break;
        }
    }

    function unlockDrive(angleType, angleParameter)
    {
        switch(angleType){
            case 'Right': 
                setRight(angleParameter)
                break;
            case 'Left':
                setLeft(angleParameter)
                break;
            case 'Back':
                setBack(angleParameter)
                break;
            default :
                break;
        }
    }

    function handleDrive(angle)
    {
        var outer;
        var back;
        var absAngle = Math.abs(angle);
        outer = 0.392 + (0.744 * absAngle) + (-0.0187 * (absAngle ** 2)) + (1.84E-04 * (absAngle ** 3));
        back = -0.378 + (-1.79 * absAngle) + (0.0366 * (absAngle ** 2)) + (-3.24E-04 * (absAngle ** 3));
        if(angle > 0)
        {
            constDrive(angle, outer, back);
        }
        else if(angle < 0)
        {
            constDrive(-outer, angle, -back);
        }
        else
        {
            constDrive(0, 0, 0)
        }
    }

    function constDrive(a1, a2, a3)
    {
        setRight(a1);
        setLeft(a2);
        setBack(a3);
    }

    function handleMode(e) {
        switch(e.target.value){
            case '0':
                setMode("Unlock");
                break;
            case '1': 
                setMode("Drive");
                break;
            case '2':
                setMode("Translate");
                break;
            case '3':
                setMode("Rotate");
                constDrive(135, 45, 270);
                break;
        }
    }

    return(
        <div>
            <select className="mode-change"  onChange={(e) => {handleMode(e)}}>
                <option className='unlock' value={0}>Unlock</option>
                <option className='drive' value={1}>Drive</option>
                <option className='translate' value={2}>Translate</option>
                <option className='rotate' value={3}>Rotate</option>
            </select>
            <TextSliderInput
                name='Right'
                label='Right'
                min={-MAX_TRANSLATE_ANGLE}
                max={MAX_TRANSLATE_ANGLE}
                value={right}
                onChange={handleChange}
            />
            <TextSliderInput
                name='Left'
                label='Left'
                min={-MAX_TRANSLATE_ANGLE}
                max={MAX_TRANSLATE_ANGLE}
                value={left}
                onChange={handleChange}
            />
            <TextSliderInput
                name='Back'
                label='Back'
                min={-MAX_TRANSLATE_ANGLE}
                max={MAX_TRANSLATE_ANGLE}
                value={back}
                onChange={handleChange}
            />
            <TextSliderInput
                name='angleRover'
                label='angleRover'
                min={-MAX_TRANSLATE_ANGLE}
                max={MAX_TRANSLATE_ANGLE}
                value={angleRover}
                onChange={handleChange}
            />
            <div className="two-d">
                <div className="Right Wheel" style={RStyle}/>
                <div className="Left Wheel" style={LStyle}/>
                <div className="Back Wheel" style={BStyle}/>
            </div>
        </div>
    );
}