import React, { Component } from 'react';
import Planner_Item from './Planner_Item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Planner extends Component {

  state = {
    value: ''
  }

  getVictoriaMetars = () => {
    const vic = [];
      this.props.three_hour_metars.forEach((metar) => {
        if (metar.station_id[0] === 'CYYJ') { vic.push(metar) }
      });
      return vic;
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    const vicMetars = this.getVictoriaMetars();
    return (
      <div id="planner">

        <div className="search-container">
          <form id="base-search" onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
            <button type="submit"><FontAwesomeIcon icon="plus-circle"></FontAwesomeIcon> Add to Planner</button>
          </form>
        </div>
        <Planner_Item metars={vicMetars}/>
        <h1>Planner Item</h1>     
      </div>
    );
  }
}