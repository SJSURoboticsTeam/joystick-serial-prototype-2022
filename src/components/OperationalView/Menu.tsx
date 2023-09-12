import React from "react";
import Camera from "../Camera";
import { useState } from "react";
import { Style } from "util";

export default function Menu({callback, toggleFullScreen} ) {

  const camArray = [
    {title: "chassis"},
    {title: "mast"},
    {title: "wheel_A"},
    {title: "wheel_B"},
    {title: "wheel_C"},
    {title: "arm"}
  ]
 
  return (
      <div id="ov-camera-grid">
        {camArray.map((cam) => (
          <button onClick={() => callback(cam.title)}>
            {cam.title}
          </button>
        ))}    
        <button onClick={() => toggleFullScreen(true)}>
          toggle Full Screen
        </button> 
      </div>
  );
}

