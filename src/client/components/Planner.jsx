import React, { Component } from 'react';
import Planner_Item from './Planner_Item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Planner extends Component {

  state = {
    value: '',
    bases: ['CYYJ', 'CYVR'] 
  }

  getMetars = (base) => {
    const metars = [];
      this.props.three_hour_metars.forEach((metar) => {
        if (metar.station_id[0] === base) {
          metars.push(metar) 
        }
      });
      return metars;
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let newBase = this.state.value.toUpperCase();
    let found = 0;
    if (newBase.length === 3) { newBase = 'C' + newBase }
    this.props.three_hour_metars.forEach((metar) => {
      if (metar.station_id[0] === newBase) {
        found = 1;
      }
    });
    if (found === 1) {
      const all_bases = this.state.bases.concat(newBase);
      console.log(all_bases);
      this.setState({bases: all_bases});
    }
    else {
      alert(`${newBase} is an invalid airport code`)
    }
    this.setState({value: ''});
    
  }

  render() {
    return (
      <div id="planner">

        <div className="search-container">
          <form id="base-search" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="CYYJ" value={this.state.value} onChange={this.handleChange} />
            <button type="submit"><FontAwesomeIcon icon="plus-circle"></FontAwesomeIcon> Add to Planner</button>
          </form>
        </div>

        {this.state.bases.map((base) => {
              return (
                <Planner_Item key = {base} metars={this.getMetars(base)}/>
              )
            })}
      </div>
    );
  }
}
