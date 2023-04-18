//main camera
//side camera panels
//return
//mode, speed, angle
import React, {useState} from "react";
import Camera from '../components/Camera';
import Status from '../components/Status';
//import "./OperationalView1.css";
function App(props) {
  const [isOpened, setIsOpened] = useState(false);
  const[show,toggleshow]=useState(true); 
 
  function toggle() {
    setIsOpened(wasOpened => !wasOpened);
  }
    return (
      <div className="OperationalView">
        {/* <header className="Main-View-Header">
          <Camera name="0" src="http://raspberrypi:8000/stream.mjpg" /> */}
          <h2>
            Operational View 1
          </h2>
          <h5>
            Speed:
            ,Angle:
            ,mode:
          </h5>
          <h3>
            Main View
          </h3>
        {/* </header> */}
        <div className="Overlay-btn">
          <button type="button" className="btn-toggle" aria-pressed="true" onClick={()=>toggleshow(!show)}>
            {/* {show ? "hide" : "show"} */}
            Overlay
          </button>
          
          {show && <button type="button" className="cam1-toggle" aria-pressed="true">
            <Camera name="1" src="http://raspberrypi:8001/stream.mjpg" />
            <h5>Camera 1</h5>
          </button>}
          {show && <button type="button" className="cam2-toggle" aria-pressed="true">
            <Camera name="2" src="http://raspberrypi:8002/stream.mjpg" />
            <h5>Camera 2</h5>
          </button> }
          {show &&  <button type="button" className="cam3-toggle" aria-pressed="true">
             <Camera name="3" src="http://raspberrypi:8003/stream.mjpg" />
            <h5>Camera 3</h5>
          </button>}
          {show && <button type="button" className="returnPty-toggle" aria-pressed="true">
            Return to Prototype
          </button>}
          
        </div>
      </div>
    );
  }
  
  export default App;
