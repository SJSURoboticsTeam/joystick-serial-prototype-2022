
import MainCamera from "./OperationalView/MainCamera";

export default function FullScreen({camNum}) {
  console.log(camNum)
  const displayCam = Array.from({length: camNum}, (_, index) => {
    return <MainCamera key={index}/>
  }); 

    return(
      <div className="fullscreen">
        {displayCam}
      </div>
    );
}