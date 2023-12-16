import OVStatus from "./OperationalView/OVStatus";
import FullScreen from "./FullScreenView";
import WheelAngle from "./Tools/WheelAngle";
import DriveSystem from "./DriveSystem";
import { useState, useRef } from "react";
import { DEFAULT_DRIVE_COMMANDS } from "../util/constants";
import { DriveCommandDTO } from "../util/command-dto";

export default function OperationalView({ commands, status }) {
  const [camNum, setCamNum] = useState(1)

  return(
    <div className="operational-view">
      {/* left */}
      <div id = "ov-tools">
        {/* <OVStatus status = {status}/>
        <select className="cam-num"  onChange={(e) => {setCamNum(parseInt(e.target.value))}}>
          <option className='btn btn__primary' value={1}>1 cam</option>
          <option className='btn btn__primary' value={2}>2 cam</option>
          <option className='btn btn__primary' value={3}>3 cam</option>
        </select> */}
        {/* <DriveSystem commands={commands}/> */}
      </div>
      <WheelAngle commands={commands}/>
      {/* right
      <FullScreen camNum = {camNum}/> */}
    </div>
  );
}
