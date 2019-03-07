import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const uuidv4 = require('uuid/v4');

export default class AirportMarker extends Component {

  render() {
    
    
    
    return (
      <Marker options={{icon: '/public/airport.png', label: `${this.props.data.station_id}`}} station={this.props.data.station_id} position={{ lat: `${this.props.data.latitude[0]}`, lng: `${this.props.data.longitude[0]}` }} >
        {/* {this.state.open && (
        <InfoWindow onClick={() => this.setState(state => ({open: !state.open}))}> {name} </InfoWindow>
        )} */}
      </Marker>
    );
  }
}
