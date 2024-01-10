import {useState} from "react"
import Camera from "../Camera";
import noCam from './Main_Camera_Test.png'
import cam2 from './oatmeal.gif'
import Menu from "./Menu";
import Kermit from "../../kermit.jpg"
import Kermit2 from '../../kermit 2.jpg'
//Todo: need to add more cameras

//Todo: swap from div to img for cam

export default function Pane(){
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
            fileName = Kermit;
            break;
        case 'mast':
            fileName = Kermit2;
            break;
        case 'wheel_A':
            fileName = Kermit;
            break;
        case 'wheel_B':
            fileName = Kermit2;
            break;
        case 'wheel_C':
            fileName = Kermit;
            break;
        case 'arm':
            fileName = Kermit2;
            break;
        default :
            fileName = Kermit;
            break;
    }

    return(
        <div className="pane">
            <Menu callback = {setActiveCam} openMenu={openMenu} closeMenu={setOpenMenu}/>
            <Camera name={activeCam} src={fileName} className={activeCam}/>
            <button className="pane-toggle" onClick={() => toggleMenu()}>...</button>
        </div>
    );
}