import React from "react";
import {useState} from "react"
import cam1 from './Main_Camera_Test.png'
import cam2 from './oatmeal.gif'
//need to add more cameras


export default function MainCamera({mainCam}){
    var fileName = cam1;

    switch (mainCam)
    {
        case 'top':
            fileName = cam1;
            break;
        case 'front':
            fileName = cam2
            break;
        case 'back':
            fileName = cam1;
            break;
        case 'left':
            fileName = cam2
            break;
        case 'right':
            fileName = cam1;
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