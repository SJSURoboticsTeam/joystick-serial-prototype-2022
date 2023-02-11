import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

var queue = [];
var timerQue={};
var timer=null;
var counter = 0;

class MapContainer extends Component {
  //constructor for your marker
  const 
  constructor(props) {
    super(props);
    var queue = [];
    this.state = {
      markers: [
        {
          title: "The marker`s title will appear as a tooltip.",
          name: "Yrll",
          position: { lat: 37.334061, lng: -121.879591 }
        }
      ]

    };
    this.mapClicked = this.mapClicked.bind(this);
  }

  //function for clicking on the map
  mapClicked(mapProps, map, clickEvent) {
    const lat = clickEvent.latLng.lat();
    const lng = clickEvent.latLng.lng();


   
    // queue.push(JSON.stringify(temp))
    // console.log(queue)
    
    queue.push({lat,lng})
    this.props.setQueue([...queue]);
    if(timer==null){
      timer=setTimeout(()=>{
        //if we click the market, it should remove from queu
        let firstElement=queue[0]
        if(!firstElement){
          timer=null;
          return
        }
        let temp=JSON.parse(this.props.commands.current)
        counter += 1;
        console.log(counter)
        var x = counter.toString();
        temp.coordinates = {
           [x] : [lat, lng]
        }
        
        this.props.commands.current=JSON.stringify(temp)
        timer=null
        console.log(this.props.commands.current)
        
      },[10000])
    }
   
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
      console.log(e);
      const lat = e.latLng.lat().toString();
      const lng = e.latLng.lng().toString();
      const coordinates = lat + ", " + lng;
      let markExitst=this.state.markers.filter(item=>item.position.lat==lat && item.position.lng==lng)
    console.log("current mark",this.state.markers)
    console.log("lat=>",lat,"log=>",lng)
    console.log("mark",markExitst)
    if(markExitst.length!==0){
      for(let i=0;i<this.state.markers.length;i++){
        if(this.state.markers[i].position.lat==lat && this.state.markers[i].position.lng==lng){
           this.state.markers.splice(i,1) ;
           this.setState({markers:this.state.markers})
           queue.splice(i,1)
           this.props.setQueue([...queue])
           return
        }
      }
    }
      console.log(coordinates);
      this.setState({
        activeMarker: marker,
        showingInfoWindow: true,
        coordinate: coordinates
    });
    this.display()
    }
  
  //renderer
  render() {
    return (
      //map
      <Map
        google={this.props.google}
        onClick={this.mapClicked}
        style={{ width: "32%", height: "63%", left: "-5px"}}
        zoom={10}
        initialCenter={{
          lat: 37.334061,
          lng: -121.879591
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
            onContextMenu={this}
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

export {queue};