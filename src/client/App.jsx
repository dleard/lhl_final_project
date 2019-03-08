import React, { Component } from 'react';
import Planner from './components/Planner'
import Dashboard from './components/Dashboard'
import ReactImage from './react.png';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MapContainer from './components/MapContainer.jsx';
import StyledMap from './components/StyledMap.jsx';
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
    start_location: null,
    notams: null
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

    fetch(`/api/getnotams`)
    .then(res => res.json())
    .then(result => {
      const nresults = result;
      this.setState({notams: nresults})
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
    this.setState({show_dash: false, start_location: st.location, province: st.selected_province});
    fetch(`api/getmetars/${st.selected_province}`)
    .then(res => res.json())
    .then(result => {
      const mresults = result.response.data[0].METAR;
      this.setState({three_hour_metars: mresults})
    })
    .catch(error => console.log(error));


  }

  render() {
    if (this.state.three_hour_metars !== null) { console.log(this.state.three_hour_metars[0].longitude) }
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
        <MapContainer viewBase={this.viewBase} metars={this.state.three_hour_metars} notams={this.state.notams} />
      </div>
    );
  }
}
