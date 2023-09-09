import React from "react";
import {useState} from "react"
import Camera from "../Camera";
import noCam from './Main_Camera_Test.png'
import cam2 from './oatmeal.gif'
//Todo: need to add more cameras

//Todo: swap from div to img for cam

export default function MainCamera({mainCam}){
    var fileName = noCam;
    //Todo: add more cameras from rover
    var testCam1 = 'http://192.168.1.119:8081/'
    var testCam2 = 'http://192.168.1.196:8081/'

    switch (mainCam)
    {
        case 'chassis':
            fileName = testCam1;
            break;
        case 'mast':
            fileName = testCam2;
            break;
        case 'wheel_A':
            fileName = noCam;
            break;
        case 'wheel_B':
            fileName = cam2;
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

    return(
        <Camera name={mainCam} src={fileName} />
    );
}