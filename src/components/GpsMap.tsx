import React, { Component } from "react";
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'

export default function GpsMap(props) {
    function mapClicked(){
        console.log("map clicked")
    };

    return(
        <Map google = {props.google}
          onClick={mapClicked}
          apiKey = 'AIzaSyBu3arSboQ85q29cs3L7B1GLPjVsN4VO5o'
          style = {{width:"100%", height:"100%"}}
          zoom = {10}
          initialCenter = {
            {
              lat: 37.663626,
              lng: -122.106001
            }
          }
        >
          <Marker
              name={'Current location'} />
        </Map>
      );
}
