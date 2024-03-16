export default function Menu({
  setActivePane,
  setPaneType,
  openMenu,
  closeMenu,
}) {
  const camArray = [
    { title: "chassis", type: "cam" },
    { title: "mast", type: "cam" },
    { title: "wheel_A", type: "cam" },
    { title: "wheel_B", type: "cam" },
    { title: "wheel_C", type: "cam" },
    { title: "arm", type: "cam" },
    { title: "2D drive sim", type: "widget" },
    { title: "Controller Configuration", type: "widget" },
  ];

  const menuSelection = (cam) => {
    closeMenu(false);
    setActivePane(cam.title);
    setPaneType(cam.type);
  };

  return (
    <div className="menu">
      {camArray.map((cam) => (
        <button className="current-pane" onClick={() => menuSelection(cam)}>
          {cam.title}
        </button>
      ))}
    </div>
  );
}
