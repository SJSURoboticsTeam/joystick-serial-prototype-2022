import React, { useState } from "react";
import MainView from "./OVA-MainView";
import OverlayMenu from "./OVA-OverlayMenu";
import "./OperationalViewAlpha.css";


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
