import React, { useState } from "react"
import Camera from "./Camera";

export default function FullScreen(handleFullscreen) {
    const[fullScreen, setFullScreen] = useState(handleFullscreen)
    const closeFullScreen = () => {
        setFullScreen(!handleFullscreen);
    }

    return(
        <dialog className="full-screen-view" onClose={fullScreen}>
            hello
            <button onClick={() => closeFullScreen()}>
                Return
            </button>
        </dialog>
    );
}