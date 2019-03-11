import React, { Component } from 'react';

export default class Timer extends Component {

  state = {
    time: Date.now()
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {

    const timeSinceMetar = this.state.time - Date.parse(this.props.metar.observation_time[0]);
    const minutes = Math.trunc(timeSinceMetar/1000 / 60);
    const seconds = Math.trunc(timeSinceMetar/1000) % 60;
      
      return (
        <div style={{float: 'right'}}>
            Last Metar Updated {minutes}m {seconds}s ago
        </div>
      );
    
  }
}