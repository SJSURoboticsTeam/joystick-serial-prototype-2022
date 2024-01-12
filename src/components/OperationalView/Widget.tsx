import TwoDDriveSim from "../Tools/TwoDDriveSim";

export default function Widget({rover, dimension, reload})
{

    return(
        <div className="widget">
            <TwoDDriveSim rover={rover} dimension={dimension} reload={reload}/>
        </div>
    )
}