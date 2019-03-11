import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const uuidv4 = require('uuid/v4');

export default class MarkerSet extends Component {

  render() {
    
    if (this.props.metars != null) {
      
      const markers = this.props.metars.map(marker => (
        <Marker key={uuidv4()} station={marker.station_id} position={{ lat: `${marker.latitude[0]}`, lng: `${marker.longitude[0]}` }} />
      ));
      
      return (
        <div>
            {markers} 
        </div>
      );
    }
    
    return (
      <div>
          
      </div>
    );
  }
}