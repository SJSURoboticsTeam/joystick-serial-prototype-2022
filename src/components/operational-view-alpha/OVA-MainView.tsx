import React from "react";
import Camera from "../common/Camera";
import Status from "../common/Status";
import { useState } from "react";
import "./OVA-OverlayMenu";
import "./OVA-MainView";
function MainView({ setShowOverlay, showOverlay }) {
  
  return (
    <div className="MainView">
      <header className="Main-View-Header">
        <Camera name="0" src="http://raspberrypi:8000/stream.mjpg" />
      </header>
      <div className="status">
        <h3>Speed: ,Angle: ,mode:</h3>
      </div>
      <button type="button" className="btn-toggle" aria-pressed="true" 
               onClick={()=> setShowOverlay(!showOverlay)}>
                {showOverlay ? "Hide " : "Show "}
                 Overlay
               </button>
    </div>
  );
}

export default MainView;
