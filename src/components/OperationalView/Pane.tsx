import {useRef, useState, useLayoutEffect, useEffect} from "react"
import Camera from "../Camera";
import Menu from "./Menu";
import Widget from "./Widget";

export default function Pane({rover, paneID, panelLayout, reload}){
    const noCam = "/images/Main_Camera_Test.png"
    const Kermit = "/images/kermit.jpg";
    const Kermit2 = '/images/kermit 2.jpg';
    const Kermit3 = '/images/kermit3.gif';
    let fileName = noCam;
    let panePos = { xS: 0, yS: 0, xE: 0, yE: 0 }
    const [openMenu, setOpenMenu] = useState(false)
    const [activePane, setActivePane] = useState(null)
    const [paneType, setPaneType] = useState('cam')
    const targetRef = useRef(null);
    const [dimension, setDimension] = useState({
        width: 0,
        height: 0
    })

    const getSize = () => {
        const newWidth = targetRef.current.clientWidth;
        const newHeight = targetRef.current.clientHeight;
        setDimension({...dimension, width: newWidth, height: newHeight});
    }

    useEffect(()=>{
        if(!targetRef.current) return;
        const resizeObserver = new ResizeObserver(()=> {     
            getSize();
        });
        resizeObserver.observe(targetRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    const toggleMenu = () => {
      setOpenMenu(true)
    }

    //Todo: add cameras from rover
    switch (activePane)
    {
        case 'chassis':
            fileName = Kermit;
            break;
        case 'mast':
            fileName = Kermit2;
            break;
        case 'wheel_A':
            fileName = Kermit3;
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
        case '2D drive sim' :
            break;
        default :
            fileName = Kermit;
            break;
    }

    function setPane(xS1, yS1, xE1, yE1,
                     xS2, yS2, xE2, yE2,
                     xS3, yS3, xE3, yE3,
                     xS4, yS4, xE4, yE4)
    {
        let xStart;
        let yStart;
        let xEnd;
        let yEnd;
        switch(paneID)
        {
            case 0:
                xStart = xS1;
                yStart = yS1;
                xEnd = xE1;
                yEnd = yE1;
                break;
            case 1:
                xStart = xS2;
                yStart = yS2;
                xEnd = xE2;
                yEnd = yE2;
                break;
            case 2:
                xStart = xS3;
                yStart = yS3;
                xEnd = xE3;
                yEnd = yE3;
                break;
            case 3:
                xStart = xS4;
                yStart = yS4;
                xEnd = xE4;
                yEnd = yE4;
                break;
            default:
                break;
        }

        return {xS: xStart,
                yS: yStart,
                xE: xEnd,
                yE: yEnd};
    }

    switch(panelLayout)
    {
      case 'p1':
        panePos = setPane(1, 1, 3, 3,
                          0, 0, 0, 0,
                          0, 0, 0, 0,
                          0, 0, 0, 0);
        break;
      case 'p2-l1':
        panePos = setPane(1, 1, 3, 2,
                          1, 2, 3, 3,
                          0, 0, 0, 0,
                          0, 0, 0, 0);    
        break;
      case 'p2-l2':
        panePos = setPane(1, 1, 2, 3,
                          2, 1, 3, 3,
                          0, 0, 0, 0,
                          0, 0, 0, 0);  
        break;
      case 'p3-l1':
        panePos = setPane(1, 1, 2, 2,
                          1, 2, 2, 3,
                          2, 1, 3, 3,
                          0, 0, 0, 0);
        break;    
      case 'p3-l2':
        panePos = setPane(1, 1, 3, 2,
                          2, 2, 3, 3,
                          1, 2, 2, 3,
                          0, 0, 0, 0);
        break;
      case 'p3-l3':
        panePos = setPane(1, 1, 2, 3,
                          2, 1, 3, 2,
                          2, 2, 3, 3,
                          0, 0, 0, 0);
        break;
      case 'p3-l4':
        panePos = setPane(1, 1, 2, 2,
                          1, 2, 3, 3,
                          2, 1, 3, 2,
                          0, 0, 0, 0);
        break;
      case 'p4':
        panePos = setPane(1, 1, 2, 2,
                          1, 2, 2, 3,
                          2, 1, 3, 2,
                          2, 2, 3, 3);
        break;    
      default :
        break;
    }

     const paneStyle = {
        backgroundColor: '#3A3A42',
        overflow: 'hidden',
        border: 'solid',
        borderColor: '#D1C7B5',
        borderRadius: '25px',
        width: '100%',
        height: '100%',
        gridArea: `${panePos.xS} / ${panePos.yS} / ${panePos.xE} / ${panePos.yE}` 
    };

    return(
        <div className="pane" style={paneStyle} id={paneID} ref={targetRef}>
            {(paneType == 'cam') ? (
                <Camera name={activePane} src={fileName} className={activePane}/>
            ) : (
                <Widget rover={rover} dimension={dimension} reload={reload}/>
            )}
            {(openMenu) ? (
                <Menu setActivePane = {setActivePane} setPaneType = {setPaneType} openMenu={openMenu} closeMenu={setOpenMenu}/>
            ) : (
                <button className="pane-toggle" onClick={() => toggleMenu()}>...</button>
            )}
        </div>
    );
}