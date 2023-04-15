//main camera
//side camera panels
//return
//mode, speed, angle
import React from "react";
import MainView from "./OperationalView1Assets/OV1-MainView";
import OverlayMenu from "./OperationalView1Assets/OV1-OverlayMenu";
import "./OperationalView1.css";

function OperationalView1(props) {
    return (
      <div className="OperationalView">
      <MainView/>
      <OverlayMenu/>
    </div>
    );
  }
  
  export default OperationalView1;
