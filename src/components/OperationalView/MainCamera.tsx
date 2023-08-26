import React from "react";
import {useState} from "react"
import noCam from './Main_Camera_Test.png'
import cam2 from './oatmeal.gif'
//Todo: need to add more cameras

//Todo: swap from div to img for cam

export default function MainCamera({mainCam}){
    var fileName = noCam;

    switch (mainCam)
    {
        case 'chassis':
            fileName = noCam;
            break;
        case 'mast':
            fileName = cam2
            break;
        case 'wheel_A':
            fileName = noCam;
            break;
        case 'wheel_B':
            fileName = cam2
            break;
        case 'wheel_C':
            fileName = noCam;
            break;
        case 'arm':
            fileName = cam2;
            break;
        default :
            fileName = noCam;
            break;
    }

    const camStyle = {
        backgroundImage: `url(${fileName})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        aspectRatio: '4/3'
      };

    return(
        <div id = "ov-main-cam"style={camStyle}>
        </div>
    );
}