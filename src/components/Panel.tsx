import { Style } from "util";
import Pane from "./OperationalView/Pane";

export default function Panel({paneNum}) {
  console.log(paneNum)
  const displayCam = Array.from({length: paneNum}, (_, index) => {
    return <Pane key={index}/>
  }); 

  // const panelStyle = {
  //   backgroundColor: '#D1C7B5',
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   flexDirection: paneNum >= 3 ? 'column' : 'row'
  // };

    return(
      <div className="panel">
         {displayCam}
      </div> 
    );
}