import Pane from "./Pane";

export default function Panel({
  paneNum,
  panelLayout,
  ovCommands,
  rover,
  reload,
}) {
  const displayPane = Array.from({ length: paneNum }, (_, index) => {
    return (
      <Pane
        ovCommands={ovCommands}
        rover={rover}
        paneID={index}
        panelLayout={panelLayout}
        key={index}
        reload={reload}
      />
    );
  });

  return <div className="panel">{displayPane}</div>;
}
