import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Planner_Title extends Component {

  render() {
      return (
        <div>
            Planner
            <button style={{float:'right'}} onClick={() => {console.log('clicked') }}className="btn btn-primary"><FontAwesomeIcon icon="redo"></FontAwesomeIcon> Refresh</button>
        </div>
      );    
  }
}