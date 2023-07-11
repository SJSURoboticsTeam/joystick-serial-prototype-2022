import Camera from "../Camera";

export default function Menu() {
  return (
      <div id="ov-camera-grid">
        <button type="button" className="ov-camera-toggle">
          Leg A Camera
        </button>
        <button type="button" className="ov-camera-toggle">
          Leg B Camera
        </button>
        <button type="button" className="ov-camera-toggle">
          Leg C Camera
        </button>
      </div>
    
  );
}

