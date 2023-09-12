import { useState } from "react";
import Menu from "./OperationalView/Menu";
import Camera from "./Camera";
import OVStatus from "./OperationalView/OVStatus";
import MainCamera from "./OperationalView/MainCamera";
import FullScreen from "./FullScreenView";

export default function OperationalView({ commands, status }) {
  const [activeCam, setActiveCam] = useState(null)
  const [fullScreen, setFullScreen] = useState(false)
  
  return (
    <div className="operational-view">
      {/* left */}
      <div id = "ov-tools">
        <OVStatus status = {status}/> 
      </div>
      {/* main */}
      <MainCamera mainCam = {activeCam}/>
      {/* right */}
      <Menu callback = {setActiveCam} toggleFullScreen = {setFullScreen}/>
      <FullScreen handleFullscreen = {fullScreen}/>
    </div>
  );
}
