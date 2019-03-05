import React, { Component } from 'react';
import Planner_Item from './Planner_Item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Planner extends Component {

  getVictoriaMetars = () => {
    const vic = [];
      this.props.three_hour_metars.forEach((metar) => {
        if (metar.station_id[0] === 'CYYJ') { vic.push(metar) }
      });
      return vic;
  }

  render() {
    const vicMetars = this.getVictoriaMetars();
    return (
      <div id="planner">

        <div className="search-container">
          <form id="base-search">
            <input type="text" placeholder="CYYJ" name="search"/>
            <button type="submit"><FontAwesomeIcon icon="plus-circle"></FontAwesomeIcon> Add to Planner</button>
          </form>
        </div>
        <Planner_Item metars={vicMetars}/>
        <h1>Planner Item</h1>     
      </div>
    );
  }
}