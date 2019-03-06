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
  state = {
    username: null,
    isPaneOpenLeft: false,
    three_hour_metars: null,
    taffs: null,
    bases: ['CYYJ', 'CYVR']
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

  render() {
    return (
      <div>
        <button id="open-planner" onClick={() => this.setState({ isPaneOpenLeft: true })}>Planner <FontAwesomeIcon icon="angle-double-right"></FontAwesomeIcon></button>
        <SlidingPane
                closeIcon={<div><FontAwesomeIcon icon="angle-double-left"></FontAwesomeIcon></div>}
                isOpen={ this.state.isPaneOpenLeft }
                title='Trip Planner' //can be own component
                from='left'
                width='50%'
                onRequestClose={ () => this.setState({ isPaneOpenLeft: false }) }>
                <div><Planner addToPlanner={this.addToPlanner} bases={this.state.bases} three_hour_metars={this.state.three_hour_metars} taffs={this.state.taffs} /></div>
            </SlidingPane>
        <MapContainer />
      </div>
    );
  }
}
