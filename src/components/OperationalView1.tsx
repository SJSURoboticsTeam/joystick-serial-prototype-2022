//main camera
//side camera panels
//return
//mode, speed, angle
import React from "react";
import Camera from '../components/Camera';
import Status from '../components/Status';
//import "./OperationalView1.css";

function App(props) {
    return (
      <div className="OperationalView">
        <header className="Main-View-Header">
          <Camera name="0" src="http://raspberrypi:8000/stream.mjpg" />
          <h5>
            Main View
          </h5>
        </header>
        <div className="status">
          <h3>
            Speed:
            ,Angle:
            ,mode:
          </h3>
        </div>
        <div className="Overlay-btn">
          <button type="button" className="btn-toggle" aria-pressed="true">
            Overlay
          </button>
        </div>
  {/* Overlay components */}
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
    );
  }
  
  export default App;
