import React, { Component } from 'react';
import Planner from './components/Planner'
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
    three_hour_metars: null
  };

  viewBase(code) {

  }

  componentDidMount() {
    Modal.setAppElement('body');
    fetch("/api/getxml")
    .then(res => res.json())
    .then(result => {
      const results = result.response.data[0].METAR;
      this.setState({three_hour_metars: results})
      const vic = [];
      results.forEach((metar) => {
        if (metar.station_id[0] === 'CYYJ') { vic.push(metar) }
      });
      console.log(vic)
      console.log(this.state.three_hour_metars);
      
    })
    .catch(error => console.log(error));
    
  }

  render() {
    
    const metar = this.state.three_hour_metars !== null ? this.state.three_hour_metars[0].raw_text[0] : ''
    return (
      <div>
        <button className="btn btn-secondary col-sm-1 col-sm-offset-4" id="open-planner" onClick={() => this.setState({ isPaneOpenLeft: true })}>Planner <FontAwesomeIcon icon="angle-double-right"></FontAwesomeIcon></button>
        <SlidingPane
                closeIcon={<div><FontAwesomeIcon icon="angle-double-left"></FontAwesomeIcon></div>}
                isOpen={ this.state.isPaneOpenLeft }
                title='Trip Planner' //can be own component
                from='left'
                width='50%'
                onRequestClose={ () => this.setState({ isPaneOpenLeft: false }) }>
                <div><Planner/></div>
            </SlidingPane>
        <MapContainer viewBase={this.viewBase} metars={this.state.three_hour_metars} />
      </div>
    );
  }
}
