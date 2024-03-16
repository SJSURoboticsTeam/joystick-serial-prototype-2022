import TwoDDriveSim from "../Widgets/TwoDDriveSim";
import ControllerConfiguration from "../Widgets/ControllerConfiguration";

export default function Widget({
  widgetComponent,
  ovCommands,
  rover,
  dimension,
  reload,
}) {
  const displayWidget = () => {
    if (widgetComponent == "2D drive sim") {
      return (
        <TwoDDriveSim rover={rover} dimension={dimension} reload={reload} />
      );
    } else if (widgetComponent == "Controller Configuration") {
      return <ControllerConfiguration commands={ovCommands} />;
    }
  };

  return <div className="widget">{displayWidget()}</div>;
}
