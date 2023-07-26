import { useState } from "react";
import Menu from "./OperationalView/Menu";
import Camera from "./Camera";
import OVStatus from "./OperationalView/OVStatus";
import MainCameraTest from "../Main Camera Test.png"

export default function OperationalView({ commands, status }) {
  const [showOverlay, setShowOverlay] = useState(false)
  return (
    <div className="operational-view">
      <div id = "ov-tools">
        <OVStatus status = {status}/> 
      </div>
      <div id="ov-main-camera"> 
      </div>
      <Menu />
      {/* <Camera name="primary" src="http://192.168.1.153:8081/" /> */}
    </div>
  );
}
