import React from "react";
import Camera from "../Camera";
import { useState } from "react";
import { Style } from "util";

export default function Menu({callback, openMenu, closeMenu} ) {
  const menuSelection = (title) => {
    closeMenu(false)
    callback(title)
  }

  const camArray = [
    {title: "chassis"},
    {title: "mast"},
    {title: "wheel_A"},
    {title: "wheel_B"},
    {title: "wheel_C"},
    {title: "arm"}
  ]
 
  return (
      <dialog className="ov-camera-grid" open={openMenu} onClose={menuSelection}>
        {camArray.map((cam) => (
          <button onClick={() => menuSelection(cam.title)}>
            {cam.title}
          </button>
        ))}    
      </dialog>
  );
}

