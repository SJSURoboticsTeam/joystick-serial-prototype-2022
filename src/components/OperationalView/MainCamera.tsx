import React from "react";
import {useState} from "react"
import Camera from "../Camera";
import noCam from './Main_Camera_Test.png'
import cam2 from './oatmeal.gif'
import Menu from "./Menu";
//Todo: need to add more cameras

//Todo: swap from div to img for cam

export default function MainCamera(){
    const [openMenu, setOpenMenu] = useState(false)
    const [activeCam, setActiveCam] = useState(null)

    const toggleMenu = () => {
      setOpenMenu(true)
    }
    var fileName = noCam;
    //Todo: add more cameras from rover
    var testCam1 = 'http://192.168.1.119:8081/'
    var testCam2 = 'http://192.168.1.196:8081/'

    switch (activeCam)
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
        <div className="main-camera">
            <Menu callback = {setActiveCam} openMenu={openMenu} closeMenu={setOpenMenu}/>
            <button onClick={() => toggleMenu()}>
                <Camera name={activeCam} src={fileName} className={'camera'} />
            </button>
        </div>
    );
}