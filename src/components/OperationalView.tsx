import OVStatus from "./OperationalView/OVStatus";
import Panel from "./Panel";
import WheelAngle from "./Tools/TwoDDriveSim";
import DriveSystem from "./DriveSystem";
import { useState, useRef } from "react";
import { DEFAULT_DRIVE_COMMANDS } from "../util/constants";
import { DriveCommandDTO } from "../util/command-dto";
import OVSidebar from "./OperationalView/OVSidebar";

export default function OperationalView({ commands, status }) {
  const [paneNum, setPaneNum] = useState(1)
  const [panelLayout, setPanelLayout] = useState('p1');
  const [reload, setReload] = useState(0)
  //might want to change this to a regular object than a useState
  const [rover, setRover] = useState({
    right: 0,
    left: 0,
    back: 0,
    angleRover: 0, 
    mode: "Unlock"
  })
  // console.log('----------------');
  // console.log(rover.right);
  // console.log(rover.left);
  // console.log(rover.back);
  // console.log(rover.angleRover);
  // console.log(rover.mode);

  return(
    <div className="operational-view">
      <OVSidebar setPaneNum={setPaneNum} rover={rover}  setRover={setRover} setPanelLayout={setPanelLayout} reload={reload} setReload={setReload}/>
      <Panel paneNum={paneNum} panelLayout={panelLayout} rover={rover} reload={reload} />
    </div>
  );
}
