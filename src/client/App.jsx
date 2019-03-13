import React, { Component } from 'react';
import Planner from './components/Planner'
import Dashboard from './components/Dashboard'
import Planner_Title from './components/Planner_Title'
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MapContainer from './components/MapContainer.jsx';
import Modal from 'react-modal';
import { faCog } from '@fortawesome/free-solid-svg-icons'

// provincial/national map origin data
const mapCenters = {
  BC: {lat: 54.127, long: -123.367},
  AB: {lat: 54.127, long: -116.367},
  SK: {lat: 54.127, long: -106.367},
  MB: {lat: 54.127, long: -98.367},
  ON: {lat: 49.127, long: -85.367},
  QC: {lat: 49.127, long: -73.367},
  CA: {lat: 55.127, long: -98.367}
}

export default class App extends Component {
  
  state = {
    username: null,
    isPaneOpenLeft: false,
    three_hour_metars: null,
    single_metar: null,
    taffs: null,
    bases: [],
    show_dash: false,
    province: 'BC',
    start_location: null,
    notams: null,
    map_center: mapCenters.BC,
    zoom: 6
  };

  componentDidMount() {
    Modal.setAppElement('body');
    // Route to API to request three hours worth of metars for BC (default province)
    fetch("/api/getmetars")
    .then(res => res.json())
    .then(result => {
      const results = result.response.data[0].METAR;
      this.setState({three_hour_metars: results})
    })
    .catch(error => console.log(error));

    // Route to API to request three hours worth of metars for BC (default province)
    fetch("/api/getmetar")
    .then(res => res.json())
    .then(result => {
      const results = result.response.data[0].METAR;
      this.setState({single_metar: results})
    })
    .catch(error => console.log(error));
    
    // Route to API to request TAFs for BC (default province)
    fetch("/api/gettaffs")
    .then(res => res.json())
    .then(result => {
      const results = result.response.data;
      this.setState({taffs: results[0].TAF})
    })
    .catch(error => console.log(error));

    // Route to API to reqeust NOTAMs (all Canada)
    fetch(`/api/getnotams`)
    .then(res => res.json())
    .then(result => {
      const nresults = result;
      this.setState({notams: nresults})
    })
    .catch(error => console.log(error));
  }

  // Adds a selected base (airport) to the trip planner (passed as props to Planner component)
  addToPlanner = (bases) => {
    this.setState({bases})
  }

  // Shows Dashboard Modal
  showDash = () => {
    this.setState({ show_dash: true });
  };

  // Hides Dashboard Modal (passed as props to Dashboard component)
  hideDash = (e) => {
    e.preventDefault();
    this.setState({ show_dash: false });
  };

  // Handles input from Dashboard settings config as selected by user
  handleConfigSubmit = (st) => {

    this.setState({bases: [], show_dash: false, province: st.selected_province, map_center: mapCenters[st.selected_province]});
    let start_base;
    // Change map zoom if all of Canada is selected
    if (st.selected_province === 'CA') { this.setState({ zoom: 4 }) }
    else { this.setState({ zoom: 6 }) }
    // Set the start_base as selected by the user in dashboard config (start base is automatically added to planner if set)
    if (st.location !== null) {
      start_base = st.location.toUpperCase();
      if (st.location.length === 3) { start_base = "C" + start_base }
    } else {
      start_base = null;
    }
    
    // Route to get three hours worth of metars for the selected province
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
    })
    .catch(error => console.log(error));

    // Route to get one hour worth of metars for the selected province (used for populating markers / display in the map info window)
    fetch(`/api/getmetar/${st.selected_province}`)
    .then(res => res.json())
    .then(result => {
      const results = result.response.data[0].METAR;
      this.setState({single_metar: results})
    })
    .catch(error => console.log(error));
    
    // Route to get the TAFs for the selected province
    fetch(`/api/gettaffs${st.selected_province}`)
    .then(res => res.json())
    .then(result => {
      const results = result.response.data;
      this.setState({taffs: results[0].TAF})
    })
    .catch(error => console.log(error));
  }

  // Adds the base (airport) to the planner (sent as props to MapContainer component for use in the info window of a selected marker)
  infoWindowAddToPlanner = (base) => {
    const currentBases = this.state.bases;
    const allBases = [...currentBases, base]
    this.setState({bases: allBases});
  }

  // Helper function for drag & drop functionality of the trip planner (sent as props to Planner.jsx)
  onDrop = (dropResult) => {
    const currentBases = this.state.bases;
    const movedBase = currentBases[dropResult.removedIndex]
    // Move bases forward in state if dropped base was ahead of them
    if (dropResult.addedIndex > dropResult.removedIndex) {
      for (let i = dropResult.removedIndex; i < dropResult.addedIndex; i++) {
        currentBases[i] = currentBases[i+1];
      }
      currentBases[dropResult.addedIndex] = movedBase
    }
    // Move all bases backward in state if dropped base was behind them
    else if (dropResult.addedIndex < dropResult.removedIndex) {
      for (let i = dropResult.removedIndex; i > dropResult.addedIndex; i--) {
        currentBases[i] = currentBases[i-1];
      }
      currentBases[dropResult.addedIndex] = movedBase
    }
    this.setState({bases: currentBases})
  }
  // Remove an item from the Planner (sent as props to Planner.jsx and then down to Planner_Item.jsx)
  removePlannerItem = (base) => {
    const currentBases = this.state.bases;
    const filteredBases = currentBases.filter((curBase => curBase !== base));
    this.setState({bases: filteredBases});
  }

  // Refresh items in Planner by re-requesting data from API and updating state (sent as props to Planner_Title.jsx)
  refreshPlannerItems = () => {
    fetch(`api/getmetars/${this.state.province}`)
    .then(res => res.json())
    .then(result => {
      const results = result.response.data[0].METAR;
      this.setState({three_hour_metars: results})
    })
    .catch(error => console.log(error));

    fetch(`/api/gettaffs${this.state.province}`)
    .then(res => res.json())
    .then(result => {
      const results = result.response.data;
      this.setState({taffs: results[0].TAF})
    })
    .catch(error => console.log(error));
  }

  render() {
    let width = '50%'
    if (window.screen.width < 901) { width = '90%' }
    return (
      <div>
        <button id="open-planner" className='btn btn-secondary' onClick={() => this.setState({ isPaneOpenLeft: true })}>Planner <FontAwesomeIcon icon="angle-double-right"></FontAwesomeIcon></button>
        <button id="open-settings" className='btn btn-secondary' onClick={() => this.setState({ show_dash: true })}><FontAwesomeIcon icon="cog"></FontAwesomeIcon> Config</button>
        <SlidingPane
          closeIcon={<div><FontAwesomeIcon icon="angle-double-left"></FontAwesomeIcon></div>}
          isOpen={ this.state.isPaneOpenLeft }
          title={<Planner_Title refresh={this.refreshPlannerItems}/>}
          from='left'
          width={ width }
          onRequestClose={ () => this.setState({ isPaneOpenLeft: false }) }>
          <div>
            <Planner 
              addToPlanner={this.addToPlanner}
              bases={this.state.bases}
              three_hour_metars={this.state.three_hour_metars}
              taffs={this.state.taffs} 
              onDrop={this.onDrop}
              removePlannerItem={this.removePlannerItem}
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
