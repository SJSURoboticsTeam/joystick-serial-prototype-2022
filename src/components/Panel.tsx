import { Style } from "util";
import Pane from "./OperationalView/Pane";

export default function Panel({paneNum, panelLayout, rover, reload}) {
  console.log(paneNum);
  console.log(panelLayout);

  const displayPane = Array.from({length: paneNum}, (_, index) => {
    return <Pane rover={rover} 
            paneID={index} 
            panelLayout={panelLayout} 
            key={index}
            reload={reload}/>
  }); 

    return(
      <div className="panel">
         {displayPane}
      </div> 
    );
}