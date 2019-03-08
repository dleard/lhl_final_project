import React, { Component } from 'react';
import Planner from './components/Planner'
import Dashboard from './components/Dashboard'
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MapContainer from './components/MapContainer.jsx';
import Modal from 'react-modal';

export default class App extends Component {
  constructor() {
    super(); // SUPER IMPORTANT!  IF YOU LEAVE THIS OUT, STUFF BREAKS!

    this.viewBase = this.viewBase.bind(this);
  }
  state = {
    username: null,
    isPaneOpenLeft: false,
    three_hour_metars: null,
    taffs: null,
    bases: [],
    show_dash: false,
    province: null,
    start_location: null
  };

  viewBase(code) {

  }

  componentDidMount() {
    Modal.setAppElement('body');
    fetch("/api/getmetars")
    .then(res => res.json())
    .then(result => {
      const results = result.response.data[0].METAR;
      this.setState({three_hour_metars: results})
    })
    .catch(error => console.log(error));
    
    fetch("/api/gettaffs")
    .then(res => res.json())
    .then(result => {
      const results = result.response.data;
      this.setState({taffs: results[0].TAF})
    })
    .catch(error => console.log(error));
  }

  addToPlanner = (bases) => {
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

    this.setState({bases: [], show_dash: false, province: st.selected_province});
    let start_base;
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
    fetch(`/api/gettaffs${st.selected_province}`)
    .then(res => res.json())
    .then(result => {
      const results = result.response.data;
      this.setState({taffs: results[0].TAF})
    })
    .catch(error => console.log(error));
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
                <div><Planner addToPlanner={this.addToPlanner} bases={this.state.bases} three_hour_metars={this.state.three_hour_metars} taffs={this.state.taffs} /></div>
            </SlidingPane>
        <Dashboard show={this.state.show_dash} handleClose={this.hideDash} handleConfigSubmit={this.handleConfigSubmit}/>
        <MapContainer viewBase={this.viewBase} metars={this.state.three_hour_metars} />
      </div>
    );
  }
}
