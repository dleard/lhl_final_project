import React, { Component } from 'react';
import Planner_Item from './Planner_Item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Draggable } from 'react-smooth-dnd';

export default class Planner extends Component {

  state = {
    value: '',
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

  getTaff = (base) => {
    let single_taff = '';  
    this.props.taffs.forEach((taff) => {
      if (taff.station_id[0] === base) {
        single_taff = taff; 
      }
    });
    return single_taff.raw_text;
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
      const all_bases = this.props.bases.concat(newBase);
      this.props.addToPlanner(all_bases);
    }
    else {
      alert(`${newBase} is an invalid airport code`)
    }
    this.setState({value: ''});
    
  }

  render() {
    console.log(this.props)
    return (
      <div id="planner">

        <div className="search-container">
          <form id="base-search" onSubmit={this.handleSubmit}>
            <input type="text" placeholder="CYYJ" value={this.state.value} onChange={this.handleChange} />
            <button type="submit"><FontAwesomeIcon icon="plus-circle"></FontAwesomeIcon> Add to Planner</button>
          </form>
        </div>

        <Container 
          onDrop={this.props.onDrop}>
          {this.props.bases.map((base) => {
            return (
              <Draggable id = {base} key={base}>
                <Planner_Item key = {base} metars={this.getMetars(base)} taff={this.getTaff(base)}/>
              </Draggable>
            )
          })}
        </Container>    
      </div>
    );
  }
}
