import React, { Component } from 'react';
import AirportMarker from './AirportMarker.jsx';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


const uuidv4 = require('uuid/v4');
const styleObject = require('../styleObject.json');

export class MapContainer extends Component {
  constructor(props) {
    super(props); // SUPER IMPORTANT!  IF YOU LEAVE THIS OUT, STUFF BREAKS!

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  onMarkerClick = (props, marker, e) => {
    e.preventDefault;
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  render() {
    let markers;
    if (this.props.metars != null) {
      console.log('metar loaded!');
      markers = this.props.metars.map(marker => (
        <Marker options={{icon: '/public/airport.png', label: `${marker.station_id}`}} onClick={this.onMarkerClick} key={uuidv4()} station={marker.station_id} position={{ lat: `${marker.latitude[0]}`, lng: `${marker.longitude[0]}` }} /> 
      ));
    }
    return (
      <div id='map-background' className="map-background map">
        <Map google={this.props.google} styles={styleObject} center={{ lat: 55.427, lng: -123.367 }} zoom={5}>
          {markers}
          <InfoWindow
            marker = { this.state.activeMarker }
            visible = { this.state.showingInfoWindow }
          >
            <h1>HELLO</h1>
          </InfoWindow>
          
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAGvUWB72E3Dszv0iI8pkFtbLj7BonXvTU')
})(MapContainer)