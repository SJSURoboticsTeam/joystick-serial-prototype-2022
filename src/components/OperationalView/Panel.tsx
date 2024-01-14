import Pane from "./Pane";

export default function Panel({paneNum, panelLayout, rover, reload}) {
  const displayPane = Array.from({length: paneNum}, (_, index) => {
    return <Pane rover={rover} paneID={index}  panelLayout={panelLayout} key={index} reload={reload}/>
  }); 

    return(
      <div className="panel">
         {displayPane}
      </div> 
    );
}