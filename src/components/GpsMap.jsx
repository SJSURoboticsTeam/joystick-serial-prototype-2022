import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class MapContainer extends Component {
  //constructor for your marker
  constructor(props) {
    super(props);
    this.state = {
      markers: [
        {
          title: "The marker`s title will appear as a tooltip.",
          name: "Yrll",
          position: { lat: 37.663626, lng: -122.106001 }
        }
      ]
    };
    this.mapClicked = this.mapClicked.bind(this);
  }
  //function for clicking on the map
  mapClicked(mapProps, map, clickEvent) {
    const lat = clickEvent.latLng.lat();
    const lng = clickEvent.latLng.lng();
    
    let temp=JSON.parse(this.props.commands.current)
    temp.lat=lat
    temp.lng=lng
    this.props.commands.current=JSON.stringify(temp)
    console.log(this.props.commands.current)
    this.setState((previousState) => {
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
  //function to show infoWindow
  onMarkerClick = (props, marker, e) => {
    //stores the coordinates
    const lat = e.latLng.lat().toString();
    const lng = e.latLng.lat().toString();
    const coordinates = lat + ", " + lng;
    console.log(coordinates);
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
      coordinate: coordinates
    });
  };
  //renderer
  render() {
    return (
      //map
      <Map
        google={this.props.google}
        onClick={this.mapClicked}
        style={{ width: "100%", height: "100%" }}
        zoom={10}
        initialCenter={{
          lat: 37.663626,
          lng: -122.106001
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

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBu3arSboQ85q29cs3L7B1GLPjVsN4VO5o'
})(MapContainer);