import React, { Component } from 'react';
import AirportMarker from './AirportMarker.jsx';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


const uuidv4 = require('uuid/v4');
const styleObject = require('../styleObject.json');

export class MapContainer extends Component {
  constructor() {
    super(); // SUPER IMPORTANT!  IF YOU LEAVE THIS OUT, STUFF BREAKS!

    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  onMarkerClick(evt){
    console.log(evt);
    this.props.viewBase(evt.station);
  }

  render() {
    console.log('metars in mapcontainer!');
    console.log(this.props.metars);
    let markers;
    if (this.props.metars != null) {
      console.log('metar loaded!');
      markers = this.props.metars.map(marker => (
        //<Marker options={{icon: 'your_icon_url', label:
        <Marker options={{icon: '/public/airport.png', label: `${marker.station_id}`}} onClick={this.onMarkerClick} key={uuidv4()} station={marker.station_id} position={{ lat: `${marker.latitude[0]}`, lng: `${marker.longitude[0]}` }} />
        //<AirportMarker key={uuidv4()} data={marker} />
      ));
    }
    return (
      <div id='map-background' className="map-background map">
        <Map google={this.props.google} styles={styleObject} center={{ lat: 55.427, lng: -123.367 }} zoom={5}>
          {/* <MarkerSet metars={this.props.metars} /> */}
          {markers}
          
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAGvUWB72E3Dszv0iI8pkFtbLj7BonXvTU')
})(MapContainer)