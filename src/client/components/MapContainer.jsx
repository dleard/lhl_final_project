import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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

  // Marker click function, shows info window & sets this marker as active in state
  onMarkerClick = (props, marker, e) => {
    e.preventDefault;
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  renderAlerts = () => {
    const result = [];
    const metars = [];

    result[0] = <li key='head' style={{textAlign: "center"}}className="list-group-item active">Alerts</li>;
    if (this.props.metars !== null && this.state.activeMarker.station !== undefined) {
      this.props.metars.forEach((metar) => {
        if (this.state.activeMarker.station[0] === metar.station_id[0]) { metars.push(metar)}
      })
    }
    

    if (metars[0] !== undefined && this.props.metars !== null && this.state.activeMarker.station !== undefined){
      
      if (metars[0].temp_c && Number(metars[0].temp_c[0]) < 1 ) {
        
        result.push(<li key ='temp' className="list-group-item"><h5>Sub-Zero Alert: Temperature expected to be freezing.</h5></li>);
      }
      if (metars[0].visibility_statute_mi && Number(metars[0].visibility_statute_mi[0]) < 0.5) {
        result.push(<li key ='viz' className="list-group-item"><h5>Visibility Alert: Visibility below 1/2 statute mile.</h5></li>);
      }
      if (metars[0].wind_speed_kt && Number(metars[0].wind_speed_kt[0]) > 40) {
        result.push(<li key ='wind' className="list-group-item">Wind Alert: Wind speed above 40 knots.</li>);
      }
    }
    
    if (result.length === 1){
      return;
    }
    return result;
  }

  renderMetars = () => {
    const metars = [];
    
    if (this.props.metars !== null && this.state.activeMarker.station !== undefined) {
      this.props.metars.forEach((metar) => {
        if (this.state.activeMarker.station[0] === metar.station_id[0]) { metars.push(metar)}
      })

      const metarshtml = metars.map(metar => (
        <li key = {metar.raw_text} className="list-group-item">{metar.raw_text}</li> 
      ));

      return metarshtml
    }
  }

  renderNotams = () => {
    const notams = [];

    let result;
    if (this.props.notams !== null && this.state.activeMarker.station !== undefined) {
      this.props.notams.forEach((notam) => {
        if (this.state.activeMarker.station[0] === notam.location) { notams.push(notam.all)}
      })
      
      result = notams.map(notam => (
        <li key = {notam} className="list-group-item">{notam}</li> 
      
      ))
      if (result.length == 0){
        return <li key ='none' style={{textAlign: "center"}} className="list-group-item">None.</li> 
      }
      return result
    }
  }

  // VERY ugly ReactDOM function to get around bug in google-maps-react that nullifies onClick listeners inside InfoWindow
  // Try not to use this again, using ReactDOM inside the app could cause some problems
  onInfoWindowOpen(props, e) {
    const button = (<button className = "btn btn-primary" onClick={e => this.props.addToPlanner(this.state.activeMarker.station[0])}><FontAwesomeIcon icon="plus-circle"></FontAwesomeIcon> Add to Planner</button>);
    ReactDOM.render(React.Children.only(button), document.getElementById("plannerButton"));
  }

  render() {
    let markers = [];
    let stations = {};

    if (this.props.metar != null) {
      this.props.metars.forEach((metar) => {
        if (!stations[metar.station_id]){
          stations[metar.station_id] = metar;
        }
      })
    }
   
    if (this.props.metar != null) {
      
      this.props.metar.forEach((metarentry) => {
        let icon = '/public/airport.png';
        if (Number(metarentry.temp_c) < 1) {
          icon = '/public/bluecold.png'
        }
        if (Number(metarentry.visibility_statute_mi) < 0.5 || Number(metarentry.wind_speed_kt) > 40) {
          icon = '/public/yellowalert.png'
        }
        let entry = <Marker options={{icon: `${icon}`, label: `${metarentry.station_id}`}} onClick={this.onMarkerClick} key={uuidv4()} station={metarentry.station_id} position={{ lat: `${metarentry.latitude[0]}`, lng: `${metarentry.longitude[0]}` }} />
        markers.push(entry);

      });
    }
    return (
      <div id='map-background' className="map-background map">
        <Map
          google={this.props.google}
          styles={styleObject}
          center={{ lat: this.props.map_center.lat, lng: this.props.map_center.long }}
          zoom={this.props.zoom}>
          {markers}
          <InfoWindow
            marker = { this.state.activeMarker }
            visible = { this.state.showingInfoWindow }
            onOpen={(e) => this.onInfoWindowOpen(this.props, e)  }
          >
          <div>
            <ul className="list-group">
            {this.renderAlerts()}
            <li style={{textAlign: "center"}}className="list-group-item active">METAR</li>
            {this.renderMetars()}
            <li style={{textAlign: "center"}}className="list-group-item active">NOTAM</li>
            {this.renderNotams()}
          </ul>
          <div id="plannerButton"></div>
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