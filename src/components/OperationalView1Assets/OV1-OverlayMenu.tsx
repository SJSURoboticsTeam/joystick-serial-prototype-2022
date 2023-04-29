import React from "react";
import Camera from "../Camera";
import Status from "../Status";
import { useState } from "react";
import "./OV1-MainView";
function OverlayMenu() {
  return (
    <div className="OverlayMenu">
      <div className="Camera-grid">
        <button type="button" className="cam1-toggle" aria-pressed="true">
          <Camera name="1" src="http://raspberrypi:8001/stream.mjpg" />
          <h5>Camera 1</h5>
        </button>
        <button type="button" className="cam2-toggle" aria-pressed="true">
          <Camera name="2" src="http://raspberrypi:8002/stream.mjpg" />
          <h5>Camera 2</h5>
        </button>
        <button type="button" className="cam3-toggle" aria-pressed="true">
          <Camera name="3" src="http://raspberrypi:8003/stream.mjpg" />
          <h5>Camera 3</h5>
        </button>
        <button type="button" className="returnPty-toggle" aria-pressed="true">
          Return to Prototype
        </button>
      </div>
    </div>
  );
}

export default OverlayMenu;
