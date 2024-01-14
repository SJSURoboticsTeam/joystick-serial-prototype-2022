import TextSliderInput from "../Forms/TextSliderInput";
import { MAX_TRANSLATE_ANGLE } from "../../util/constants";

export default function ControlBar({rover, setRover, reload, setReload, modeRef}){
    function handleReload(){
        setReload(reload + 1);
    }

    function handleChange(e) {
        switch(rover.mode)
        {
            case 'Unlock':
                unlockDrive(e.target.name, e.target.value);
                break;
            case 'Drive' :
                if(e.target.name == "angleRover")
                {
                    const temp = e.target.value
                    handleDrive(temp);
                }
                break;
            case 'Translate' :
                if(e.target.name == "angleRover")
                {
                    const temp = e.target.value
                    setRover({ ...rover,right: temp, left: temp, back: temp, angleRover: e.target.value});
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
                setRover({ ...rover, right: angleParameter});
                break;
            case 'Left':
                setRover({ ...rover, left: angleParameter});
                break;
            case 'Back':
                setRover({ ...rover, back: angleParameter});
                break;
            default :
                break;
        }
    }

    function handleDrive(angle)
    {
        const absAngle = Math.abs(angle);
        const outer = 0.392 + (0.744 * absAngle) + (-0.0187 * (absAngle ** 2)) + (1.84E-04 * (absAngle ** 3));
        const back = -0.378 + (-1.79 * absAngle) + (0.0366 * (absAngle ** 2)) + (-3.24E-04 * (absAngle ** 3));
        if(angle > 0)
        {
            setRover({ ...rover,right: angle, left: outer.toFixed(4), back: back.toFixed(4), angleRover: angle});
        }
        else if(angle < 0)
        {
            setRover({ ...rover,right: -outer.toFixed(4), left: angle, back: -back.toFixed(4), angleRover: angle});

        }
        else
        {
            setRover({ ...rover,right: 0, left: 0, back: 0, angleRover: angle});

        }
    }

    function handleMode(e) {
        modeRef.current = e.target.value;
        switch(e.target.value){
            case "Unlock":
                setRover({ ...rover,right: 0, left: 0, back: 0, angleRover: 0, mode: "Unlock"});
                break;
            case "Drive": 
                setRover({ ...rover,right: 0, left: 0, back: 0, angleRover: 0, mode: "Drive"});
                break;
            case "Translate":
                setRover({ ...rover,right: 0, left: 0, back: 0, angleRover: 0, mode: "Translate"});
                break;
            case "Rotate":
                setRover({ ...rover,right: 135, left: 45, back: 270, angleRover: 0, mode: 'Rotate'});
                break;
        }
        console.log(modeRef.current);
    }
    
    return(
        <div className="control-bar">
            <div className="drive-control">
                <h2 className="drive-control-header">
                    Drive Control
                </h2>
                <select className="mode-change" defaultValue={modeRef.current}  onChange={(e) => {handleMode(e)}}>
                    <option className='Unlock' value={"Unlock"}>Unlock</option>
                    <option className='Drive' value={"Drive"}>Drive</option>
                    <option className='Translate' value={"Translate"}>Translate</option>
                    <option className='Rotate' value={"Rotate"}>Rotate</option>
                </select>
                <TextSliderInput
                    name='Right'
                    label='Right'
                    min={-MAX_TRANSLATE_ANGLE}
                    max={MAX_TRANSLATE_ANGLE}
                    value={rover.right}
                    onChange={handleChange}
                />
                <TextSliderInput
                    name='Left'
                    label='Left'
                    min={-MAX_TRANSLATE_ANGLE}
                    max={MAX_TRANSLATE_ANGLE}
                    value={rover.left}
                    onChange={handleChange}
                />
                <TextSliderInput
                    name='Back'
                    label='Back'
                    min={-MAX_TRANSLATE_ANGLE}
                    max={MAX_TRANSLATE_ANGLE}
                    value={rover.back}
                    onChange={handleChange}
                />
                <TextSliderInput
                    name='angleRover'
                    label='angleRover'
                    min={-MAX_TRANSLATE_ANGLE}
                    max={MAX_TRANSLATE_ANGLE}
                    value={rover.angleRover}
                    onChange={handleChange}
                />
                <button className="reload-button" onClick={handleReload}>Reload 2D Simulation</button>
            </div>
        </div>
    )
}