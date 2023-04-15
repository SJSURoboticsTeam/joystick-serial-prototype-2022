import React from "react";
import Camera from '../Camera';
import Status from '../Status';

function MainView()
{
    return(
    <div className="MainView">
        <header className="Main-View-Header">
            <Camera name="0" src="http://raspberrypi:8000/stream.mjpg" />
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
    </div>
    )
}

export default MainView;