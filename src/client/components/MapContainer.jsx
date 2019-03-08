import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const uuidv4 = require('uuid/v4');
const styleObject = require('../styleObject.json');

export class MapContainer extends Component {
  constructor(props) {
    super(props); 

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
      this.props.metars.forEach((metar) => {
        if (this.state.activeMarker.station[0] === metar.station_id[0]) { metars.push(metar)}
      })
      if (metars.length > 0) {
        const singleMetar = metars[0].raw_text[0];
        return  <li key = {singleMetar} className="list-group-item">{singleMetar}</li>
      }
    }
  }

  render() {
    let markers;
    if (this.props.metars != null) {
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
          ><div>
            <ul className="list-group">
            <li style={{textAlign: "center"}}className="list-group-item active">Metar</li>
            {this.renderMetars()}
          </ul>
          <button className="btn btn-primary" onClick={() => console.log('hi')} type="button"><FontAwesomeIcon icon="plus-circle"></FontAwesomeIcon> Add to Planner</button>
          </div>
          </InfoWindow>
          
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAGvUWB72E3Dszv0iI8pkFtbLj7BonXvTU')
})(MapContainer)