import React from "react";
import Camera from "../Camera";
import { useState } from "react";
import { Style } from "util";

export default function Menu({setActivePane, setPaneType, openMenu, closeMenu, } ) {
  const menuSelection = (cam) => {
    closeMenu(false)
    setActivePane(cam.title)
    setPaneType(cam.type)
  }

  const camArray = [
    {title: "chassis", type: "cam"},
    {title: "mast", type: "cam"},
    {title: "wheel_A", type: "cam"},
    {title: "wheel_B", type: "cam"},
    {title: "wheel_C", type: "cam"},
    {title: "arm", type: "cam"},
    {title: "2D drive sim", type: "widget"}
  ]
 
  return (
      <div className="menu">
        {camArray.map((cam) => (
          <button onClick={() => menuSelection(cam)}>
            {cam.title}
          </button>
        ))}    
      </div>
  );
}

