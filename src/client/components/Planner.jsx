import React, { Component } from 'react';
import Planner_Item from './Planner_Item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Planner extends Component {

  state = {
    value: '',
    bases: [] 
  }

  getVictoriaMetars = (base) => {
    const vic = [];
      this.props.three_hour_metars.forEach((metar) => {
        if (metar.station_id[0] === base) { vic.push(metar) }
      });
      return vic;
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newBase = this.state.value;
    const all_bases = this.state.bases.concat(newBase);
    console.log(all_bases);
    this.setState({bases: all_bases});
    this.setState({value: ''});
    
  }

  render() {
    const vicMetars = this.getVictoriaMetars();
    console.log(this.state.bases);
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
                <Planner_Item key = {base} metars={this.getVictoriaMetars(base)}/>
              )
            })}

        
        <h1>Planner Item</h1>     
      </div>
    );
  }
}
