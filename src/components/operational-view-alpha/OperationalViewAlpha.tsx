import React, { useState } from "react";
import MainView from "./OVA-MainView";
import OverlayMenu from "./OVA-OverlayMenu";
import "./OperationalViewAlpha.css";


function OperationalViewAlpha({commands, status}) {
   const [showOverlay, setShowOverlay] = useState(false)
    return (
      <div className="OperationalView">
        <MainView setShowOverlay={setShowOverlay} showOverlay={showOverlay} status={status} />
        {showOverlay && <OverlayMenu/>}
      </div>
    );
  }
  
  export default OperationalViewAlpha;
