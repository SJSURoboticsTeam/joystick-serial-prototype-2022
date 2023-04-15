import React from "react";
import Camera from '../Camera';
import Status from '../Status';

function OverlayMenu()
{
    return(
    <div className="OverlayMenu">
    <div className="Camera-grid">
        <button type="button" className="cam1-toggle" aria-pressed="true">
          <Camera name="1" src="http://raspberrypi:8001/stream.mjpg" />
        </button>
        <button type="button" className="cam2-toggle" aria-pressed="true">
          <Camera name="2" src="http://raspberrypi:8002/stream.mjpg" />
        </button>
        <button type="button" className="cam3-toggle" aria-pressed="true">
          <Camera name="3" src="http://raspberrypi:8003/stream.mjpg" /> 
        </button>
      </div>
      <div className="Return-btn">
        <button type="button" className="btn-toggle" aria-pressed="true">
          Back to main view
        </button>
      </div>
      <div className="Return-pty-btn">
        <button type="button" className="returnPty-toggle" aria-pressed="true">
          Return to Prototype
        </button>
      </div>
    </div>
    )
}

export default OverlayMenu;