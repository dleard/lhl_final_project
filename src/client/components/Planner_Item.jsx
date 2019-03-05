import React, { Component } from 'react';
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)

export default class Planner_Item extends Component {


  componentDidMount = () => {
    const labels = []
    const temps = []
    const winds = []
    const viz = []
    this.props.metars.forEach((metar) => {
      const date = new Date(metar.observation_time[0])
      const localDate = date.toString().slice(15, 21)
      labels.push(localDate)
      temps.push(metar.temp_c[0])
      winds.push(metar.wind_speed_kt[0]);
      viz.push(metar.visibility_statute_mi[0])
    })
    const ctxL = document.getElementById("tempChart").getContext('2d');
    const tempChart = new Chart(ctxL, {
      type: 'line',
      data: {
        labels: labels.reverse(),
        datasets: [{
            label: "Temperature °C",
            data: temps.reverse(),
            backgroundColor: [
              'rgba(105, 0, 132, .2)',
            ],
            borderColor: [
              'rgba(200, 99, 132, .7)',
            ],
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true
      }
    });

    const ctxL1 = document.getElementById("vizChart").getContext('2d');
    const vizChart = new Chart(ctxL1, {
      type: 'line',
      data: {
        labels: labels.reverse(),
        datasets: [{
            label: "Visiblity (mi)",
            data: viz.reverse(),
            backgroundColor: [
              'rgba(105, 0, 132, .2)',
            ],
            borderColor: [
              'rgba(200, 99, 132, .7)',
            ],
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true
      }
    });

    const ctxL2 = document.getElementById("windChart").getContext('2d');
    const windChart = new Chart(ctxL2, {
      type: 'line',
      data: {
        labels: labels.reverse(),
        datasets: [{
            label: "Wind Speed (kt)",
            data: winds.reverse(),
            backgroundColor: [
              'rgba(105, 0, 132, .2)',
            ],
            borderColor: [
              'rgba(200, 99, 132, .7)',
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
    const date = new Date(this.props.metars[0].observation_time[0])
    console.log(typeof(date));
    console.log(date.toString())
    console.log(this.props.metars);
    return (
      <div className="card">
        <div className="card-header">
          {this.props.metars[0].station_id[0].slice(1)}
        </div>
        <div className="card-body">
        <ul id="metar-pane" className="list-group">
          <li className="list-group-item active">Raw Metars</li>
          {this.props.metars.map((metar) => {
      return (
        <li key = {metar.raw_text[0]} className="list-group-item">{metar.raw_text[0]}</li>
      )
    })}
        </ul>
        <div id="metar-pane">
        <ul className="nav nav-pills">
          <li className="active"><a data-toggle="pill" href="#temp">Temp</a></li>
          <li><a data-toggle="pill" href="#menu1">Menu 1</a></li>
          <li><a data-toggle="pill" href="#menu2">Menu 2</a></li>
        </ul>

        <div style={{top: "100px", width: "120%"}} className="tab-content">
          <div style={{width: "100%"}} id="temp" className="tab-pane fade in active">
            <div style={{marginTop: "30px", width: "100%"}}>
              <canvas id="tempChart"></canvas>
            </div>
            
          </div>
          <div id="menu1" className="tab-pane fade">
            <div style={{marginTop: "30px", width: "100%"}}>
              <canvas id="vizChart"></canvas>
            </div>
          </div>
          <div id="menu2" className="tab-pane fade">
          <div style={{marginTop: "30px", width: "100%"}}>
              <canvas id="windChart"></canvas>
            </div>
          </div>
        </div>
        </div>
        
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    );
  }
}

