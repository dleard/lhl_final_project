import React, { Component } from 'react';
import Planner from './components/Planner'
import ReactImage from './react.png';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';

export default class App extends Component {
  state = {
    username: null,
    isPaneOpenLeft: false
  };

  componentDidMount() {
    fetch("/api/getxml")
    .then(res => res.json())
    .then(result => console.log(result))
    .catch(error => console.log(error));
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
                <div><Planner/></div>
            </SlidingPane>
        <img style={{width: "100vw", height: "100vh"}} src={ReactImage} alt="react" />
      </div>
    );
  }
}
