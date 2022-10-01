import React, { useState, useEffect } from "react";
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'

const [gpsCoords, setGpsCoords] = useState({lat: 0, lng: 0});
const [isLoading, setIsLoading] = useState(true)
class MapContainer extends Component {

  mapClicked(mapProps, map, clickEvent) {
    const lat = clickEvent.latLng.lat();
    const lng = clickEvent.latLng.lng();
  
    this.setState(previousState => {
      return {
        markers: [
          ...previousState.markers,
          {
            title: "",
            name: "",
            position: { lat, lng }
          }
        ]
      };
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      markers: [
        {
          title: "This is a title",
          name: "Yrll",
          position: { lat: 37.335076, lng: -121.880996 }
        }
      ]
    };
    this.mapClicked = this.mapClicked.bind(this);
  }

  onMarkerClick = (props, marker, e) => {
    //stores the coordinates
    const lat = e.latLng.lat().toString();
    const lng = e.latLng.lng().toString();
    const coordinates = lat + ", " + lng;
    console.log(coordinates);
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
      coordinate: coordinates
    });
  };

  render() {
    return (
      //map
      <Map
        google={this.props.google}
        onClick={this.mapClicked}
        style={{ width: "100%", height: "100%" }}
        zoom={10}
        initialCenter={{
          lat: gpsCoords.latitude,
          lng: gpsCoords.longitude
        }}
      >
        {this.state.markers.map((marker, index) => (
          //marker
          <Marker
            key={index}
            title={marker.title}
            name={marker.name}
            position={marker.position}
            onClick={this.onMarkerClick}
          ></Marker>
        ))}
        {/*infoWindow*/}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            {/*Placeholder for content*/}
        <p1>{this.state.coordinate}</p1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

// function MapContainer(props) {
//   const [gpsCoords, setGpsCoords] = useState({ lat: 0, lng: 0 });
//   const [isLoading, setIsLoading] = useState(true)
//   function mapClicked(mapProps, map, clickEvent) {
//     console.log(clickEvent.latLng.lat(), clickEvent.latLng.lng())
//   }

  useEffect(() => {
    fetch('http://192.168.50.243:5000/gps')
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        setGpsCoords({ longitude: data.longitude, latitude: data.latitude });
        setIsLoading(false);
      })
      .catch(console.log)
  }, [isLoading]);

//   return (
//     <div>
//       {isLoading ? "Loading" : <Map google={props.google}
//         onClick={mapClicked}
//         zoom={10}
//         initialCenter={
//           {
//             lat: gpsCoords.latitude,
//             lng: gpsCoords.longitude
//           }
//         }
//       >
//         <Marker
//           name={'Current location'} />
//       </Map>}
//     </div>
//   )
// }

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBu3arSboQ85q29cs3L7B1GLPjVsN4VO5o'
})(MapContainer)