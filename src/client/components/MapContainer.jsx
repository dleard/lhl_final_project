import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


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

  renderMetars = () => {
    const metars = [];
    
    if (this.props.metars !== null && this.state.activeMarker.station !== undefined) {
      console.log(this.state.activeMarker.station);
    console.log(this.props.metars[0])
      this.props.metars.forEach((metar) => {
        if (this.state.activeMarker.station[0] === metar.station_id[0]) { metars.push(metar)}
      })
      return  <li key = {metars[0].raw_text[0]} className="list-group-item">{metars[0].raw_text[0]}</li>
      // return metars.map((metar) => {
      //   return (
      //     <li key = {metar.raw_text[0]} className="list-group-item">{metar.raw_text[0]}</li>
      //   )
      // })
        
    }
  }

  render() {
    let markers;
    if (this.props.metars != null) {
      console.log('metar loaded!');
      console.log(this.props.metars);
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
            <ul className="list-group">
            <li style={{textAlign: "center"}}className="list-group-item active">Raw Metars</li>
            {this.renderMetars()}
          </ul>
          <button className="btn btn-primary" onClick={() => console.log('hi')} type="button"><FontAwesomeIcon icon="plus-circle"></FontAwesomeIcon>Add to Planner</button>

          </InfoWindow>
          
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAGvUWB72E3Dszv0iI8pkFtbLj7BonXvTU')
})(MapContainer)