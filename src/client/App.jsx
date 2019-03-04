import React, { Component } from 'react';
import ReactImage from './react.png';
import MapContainer from './components/MapContainer.jsx';
import StyledMap from './components/StyledMap.jsx';

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    return (
      <div>
        <MapContainer />
      </div>
    );
  }
}
