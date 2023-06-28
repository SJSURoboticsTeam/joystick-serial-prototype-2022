import { useState } from "react";
import Menu from "./OperationalView/Menu";
import Camera from "./Camera";
import OVStatus from "./OperationalView/OVStatus";

export default function OperationalView({ commands, status }) {
  const [showOverlay, setShowOverlay] = useState(false)
  return (
    <div className="operational-view">
      {/* <Camera name="primary" src="http://192.168.1.153:8081/" /> */}
      <div className="ov-camera-grid">
        <div className="operational-view-camera"> 
          Camera
        </div>
        {/* <div className="operational-view-camera"> 
          Camera
        </div> */}
      </div>
      <button id="ov-hide-overlay" type="button" className="btn-toggle" onClick={() => setShowOverlay(!showOverlay)}>
        {showOverlay ? "Hide " : "Show "}
        Overlay
      </button>
      {showOverlay && <Menu />}
      <OVStatus status = {status}/>
    </div>
  );
}
