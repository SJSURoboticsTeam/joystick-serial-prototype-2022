import { useState } from "react";
import Menu from "./OperationalView/Menu";
import Camera from "./Camera";
import OVStatus from "./OperationalView/OVStatus";
import MainCamera from "./OperationalView/MainCamera";
import Command from "./Command/ControlSystem";
import ControlSystem from "./Command/ControlSystem";

export default function OperationalView({ commands, status, system }) {
  const [activeCam, setActiveCam] = useState(null)
  
  return (
    <div className="operational-view">
      {/* left */}
      <div id = "ov-tools">
        <OVStatus status = {status}/> 
        <ControlSystem commands = {commands} system = {system}/>
      </div>
      {/* main */}
      <MainCamera mainCam = {activeCam}/>
      {/* right */}
      <Menu callback= {setActiveCam}/>
      {/* <Camera name="primary" src="http://192.168.1.153:8081/" /> */}
    </div>
  );
}
