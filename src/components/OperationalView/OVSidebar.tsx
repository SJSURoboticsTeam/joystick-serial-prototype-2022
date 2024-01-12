import { useState, useRef } from "react"
import ControlBar from "./ControlBar"
import ToolBar from "./ToolBar"

export default function OVSidebar({setPaneNum, rover, setRover, setPanelLayout, reload, setReload}) {
    const [bar, setBar] = useState(1);
    const modeRef = useRef();

    function toggleToolBar()
    {
        setBar(1);
    }

    function toggleControlBar()
    {
        setBar(0);
        setRover({...rover, mode: modeRef.current});
    }

    return(
        <div className="OVsidebar">
            <div className="sidebar-button">
                <button className="tool-bar-button" onClick={() => toggleToolBar()}>Tool Bar</button>
                <button className="control-bar-button" onClick={() => toggleControlBar()}>Control Bar</button>
            </div>
            {(bar) ? (
                <ToolBar setPaneNum={setPaneNum} setPanelLayout={setPanelLayout}/>
            ) : (
                <ControlBar rover={rover} setRover={setRover} reload={reload} setReload={setReload} modeRef={modeRef}/>
            )}
        </div>
    )
}