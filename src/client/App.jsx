import React, { Component } from 'react';
import Planner from './components/Planner'
import Dashboard from './components/Dashboard'
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MapContainer from './components/MapContainer.jsx';
import Modal from 'react-modal';

const mapCenters = {
  BC: {lat: 52.127, long: -123.367},
  AB: {lat: 52.127, long: -116.367},
  SK: {lat: 52.127, long: -106.367},
  MB: {lat: 52.127, long: -98.367},
  ON: {lat: 49.127, long: -85.367},
  QC: {lat: 49.127, long: -73.367},
  CA: {lat: 55.127, long: -98.367}
}

export default class App extends Component {
  
  state = {
    username: null,
    isPaneOpenLeft: false,
    three_hour_metars: null,
    single_meta: null,
    taffs: null,
    bases: [],
    show_dash: false,
    province: null,
    start_location: null,
    notams: null,
    map_center: mapCenters.BC,
    zoom: 5
  };


  componentDidMount() {
    Modal.setAppElement('body');
    fetch("/api/getmetars")
    .then(res => res.json())
    .then(result => {
      const results = result.response.data[0].METAR;
      this.setState({three_hour_metars: results})
    })
    .catch(error => console.log(error));

    fetch("/api/getmetar")
    .then(res => res.json())
    .then(result => {
      const results = result.response.data[0].METAR;
      this.setState({single_metar: results})
    })
    .catch(error => console.log(error));
    
    fetch("/api/gettaffs")
    .then(res => res.json())
    .then(result => {
      const results = result.response.data;
      this.setState({taffs: results[0].TAF})
    })
    .catch(error => console.log(error));

    fetch(`/api/getnotams`)
    .then(res => res.json())
    .then(result => {
      const nresults = result;
      this.setState({notams: nresults})
    })
    .catch(error => console.log(error));
  }

  addToPlanner = (bases) => {
    console.log('here')
    this.setState({bases})
  }

  showDash = () => {
    this.setState({ show_dash: true });
  };

  hideDash = (e) => {
    e.preventDefault();
    this.setState({ show_dash: false });
  };

  handleConfigSubmit = (st) => {

    this.setState({bases: [], show_dash: false, province: st.selected_province, map_center: mapCenters[st.selected_province]});
    let start_base;
    if (st.selected_province === 'CA') { this.setState({ zoom: 4 }) }
    else { this.setState({ zoom: 5 }) }
    if (st.location !== null) {
      start_base = st.location.toUpperCase();
      if (st.location.length === 3) { start_base = "C" + start_base }
    } else {
      start_base = null;
    }
    
    fetch(`api/getmetars/${st.selected_province}`)
    .then(res => res.json())
    .then(result => {
      const results = result.response.data[0].METAR;
      results.forEach((metar) => {
        if (start_base === metar.station_id[0]) { this.setState({start_location: start_base}) }
      })
      if (start_base !== this.state.start_location) { alert('Start location invalid') }
      else if (start_base !== null) {
        this.setState({bases: [start_base]})
      }
      this.setState({three_hour_metars: results})
      console.log(results);
    })
    .catch(error => console.log(error));

    fetch(`/api/getmetar/${st.selected_province}`)
    .then(res => res.json())
    .then(result => {
      const results = result.response.data[0].METAR;
      this.setState({single_metar: results})
    })
    .catch(error => console.log(error));
    
    fetch(`/api/gettaffs${st.selected_province}`)
    .then(res => res.json())
    .then(result => {
      const results = result.response.data;
      this.setState({taffs: results[0].TAF})
    })
    .catch(error => console.log(error));


  }

  infoWindowAddToPlanner = (base) => {
    const currentBases = this.state.bases;
    const allBases = [...currentBases, base]
    this.setState({bases: allBases});
  }

  onDrop = (dropResult) => {
    const currentBases = this.state.bases;
    const movedBase = currentBases[dropResult.removedIndex]
    if (dropResult.addedIndex > dropResult.removedIndex) {
      for (let i = dropResult.removedIndex; i < dropResult.addedIndex; i++) {
        currentBases[i] = currentBases[i+1];
      }
      currentBases[dropResult.addedIndex] = movedBase
    }
    else if (dropResult.addedIndex < dropResult.removedIndex) {
      for (let i = dropResult.removedIndex; i > dropResult.addedIndex; i--) {
        currentBases[i] = currentBases[i-1];
      }
      currentBases[dropResult.addedIndex] = movedBase
    }
    this.setState({bases: currentBases})
  }

  render() {
    return (
      <div>
        <button id="open-planner" onClick={() => this.setState({ isPaneOpenLeft: true })}>Planner <FontAwesomeIcon icon="angle-double-right"></FontAwesomeIcon></button>
        <button id="open-settings" onClick={() => this.setState({ show_dash: true })}>SETTINGS</button>
        <SlidingPane
          closeIcon={<div><FontAwesomeIcon icon="angle-double-left"></FontAwesomeIcon></div>}
          isOpen={ this.state.isPaneOpenLeft }
          title='Trip Planner' //can be own component
          from='left'
          width='50%'
          onRequestClose={ () => this.setState({ isPaneOpenLeft: false }) }>
          <div>
            <Planner 
              addToPlanner={this.addToPlanner}
              bases={this.state.bases}
              three_hour_metars={this.state.three_hour_metars}
              taffs={this.state.taffs} 
              onDrop={this.onDrop}
              />
          </div>
        </SlidingPane>
        <Dashboard show={this.state.show_dash} handleClose={this.hideDash} handleConfigSubmit={this.handleConfigSubmit}/>
        <MapContainer 
          metar={this.state.single_metar}
          metars={this.state.three_hour_metars}
          notams={this.state.notams} 
          addToPlanner={this.infoWindowAddToPlanner}
          map_center={this.state.map_center}
          zoom={this.state.zoom}
          />
      </div>
    );
  }
}
