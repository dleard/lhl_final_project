import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const uuidv4 = require('uuid/v4');

export default class MarkerSet extends Component {

  render() {
    console.log('metar props in markerset!');
    console.log(this.props.metars);
    if (this.props.metars != null) {
      console.log('metar loaded!');
      const markers = this.props.metars.map(marker => (
      <Marker key={uuidv4()} station={marker.station_id} position={{ lat: `${marker.latitude[0]}`, lng: `${marker.longitude[0]}` }} />
      ));
      console.log(markers);
      
    }
    
    return (
      <Marker options={{icon: '/public/airport.png', label: `${this.props.data.station_id}`}} station={this.props.data.station_id} position={{ lat: `${this.props.data.latitude[0]}`, lng: `${this.props.data.longitude[0]}` }} >
        {/* {this.state.open && (
        <InfoWindow onClick={() => this.setState(state => ({open: !state.open}))}> {name} </InfoWindow>
        )} */}
      </Marker>
    );
  }
}
