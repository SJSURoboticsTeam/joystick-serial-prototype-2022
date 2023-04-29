//main camera
//side camera panels
//return
//mode, speed, angle
import React, { useState } from "react";
import MainView from "./OperationalView1Assets/OV1-MainView";
import OverlayMenu from "./OperationalView1Assets/OV1-OverlayMenu";
import "./OperationalView1.css";


function OperationalView1({commands}) {
   const [showOverlay, setShowOverlay] = useState(false)
    return (
      <div className="OperationalView">
        <MainView setShowOverlay={setShowOverlay} showOverlay={showOverlay}/>
        {showOverlay && <OverlayMenu/>}
      </div>
    );
  }
  
  export default OperationalView1;
