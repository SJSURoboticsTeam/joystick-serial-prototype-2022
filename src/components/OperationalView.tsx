import { useState } from "react";
import Menu from "./OperationalView/Menu";
import Camera from "./Camera";

export default function OperationalView({ commands }) {
  const [showOverlay, setShowOverlay] = useState(false)
  return (
    <div className="operational-view">
      <Camera name="primary" src="http://192.168.1.153:8081/" />
      <button type="button" className="btn-toggle" aria-pressed="true"
        onClick={() => setShowOverlay(!showOverlay)}>
        {showOverlay ? "Hide " : "Show "}
        Overlay
      </button>
      {showOverlay && <Menu />}
    </div>
  );
}
