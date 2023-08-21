import React from "react";
import Camera from "../Camera";
import { useState } from "react";
import { Style } from "util";

export default function Menu({callback}) {

  const camArray = [
    {title: "top"},
    {title: "front"},
    {title: "back"},
    {title: "left"},
    {title: "right"},
  ]

  return (
      <div id="ov-camera-grid">
      {camArray.map((cam) => (
        <button onClick={() => callback(cam.title)}>
          {cam.title}
        </button>
      ))}     
       </div>
  );
}

