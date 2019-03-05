import React, { Component } from 'react';

export default class Planner_Item extends Component {


  createWindGraph = () => {
    var ctxL = document.getElementById("lineChart").getContext('2d');
    var myLineChart = new Chart(ctxL, {
      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
              'rgba(105, 0, 132, .2)',
            ],
            borderColor: [
              'rgba(200, 99, 132, .7)',
            ],
            borderWidth: 2
          },
          {
            label: "My Second dataset",
            data: [28, 48, 40, 19, 86, 27, 90],
            backgroundColor: [
              'rgba(0, 137, 132, .2)',
            ],
            borderColor: [
              'rgba(0, 10, 130, .7)',
            ],
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }

  render() {
    console.log(this.props.metars)
    return (
      <div className="card">
        <div className="card-header">
          {this.props.metars[0].station_id[0].slice(1)}
        </div>
        <div className="card-body">
        <ul style={{width: "50%"}} className="list-group">
          <li className="list-group-item active">Raw Metars</li>
          <li className="list-group-item">{this.props.metars[0].raw_text[0]}</li>
          <li className="list-group-item">{this.props.metars[1].raw_text[0]}</li>
          <li className="list-group-item">{this.props.metars[2].raw_text[0]}</li>
        </ul>
        <canvas id="lineChart">{this.createWindGraph}</canvas>
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    );
  }
}


