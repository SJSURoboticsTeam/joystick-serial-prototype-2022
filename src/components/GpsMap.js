import React, { useState, useEffect } from "react";
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'

function MapContainer(props) {
  const [gpsCoords, setGpsCoords] = useState({ lat: 0, lng: 0 });
  const [isLoading, setIsLoading] = useState(true)
  function mapClicked(mapProps, map, clickEvent) {
    console.log(clickEvent.latLng.lat(), clickEvent.latLng.lng())
  }

  useEffect(() => {
    fetch('http://localhost:5000/gps')
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        setGpsCoords({ longitude: data.longitude, latitude: data.latitude });
        setIsLoading(false);
      })
      .catch(console.log)
  }, [isLoading]);

  return (
    <div>
      {isLoading ? "Loading" : <Map google={props.google}
        onClick={mapClicked}
        zoom={10}
        initialCenter={
          {
            lat: gpsCoords.latitude,
            lng: gpsCoords.longitude
          }
        }
      >
        <Marker
          name={'Current location'} />
      </Map>}
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBu3arSboQ85q29cs3L7B1GLPjVsN4VO5o'
})(MapContainer)