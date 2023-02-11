import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay';

const OfflineMap = () => {
  const mapRef = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!map.current) {
      const view = new View({
        center: [0, 0],
        zoom: 2
      });

      map.current = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: view
      });

      const marker = new Overlay({
        position: [0, 0],
        element: document.getElementById('marker')
      });
      map.current.addOverlay(marker);
    }
  }, []);

  return (
    <div>
      <div ref={mapRef} style={{ height: '500px', width: '100%' }} />
      <div id="marker" className="marker">
        <img src="src/roverMark.png" alt="marker" />
      </div>
    </div>
  );
};

export default OfflineMap;



