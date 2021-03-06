import React, { Component } from 'react';
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'
import Timer from './Timer'

ReactChartkick.addAdapter(Chart)

export default class Planner_Item extends Component {

  componentDidMount = () => {
    // Populate values necessary to create graphs in item card
    const labels = []
    const temps = []
    const winds = []
    const viz = []
    this.props.metars.forEach((metar) => {
      const date = new Date(metar.observation_time[0])
      const localDate = date.toString().slice(15, 21)
      labels.push(localDate)
      // Not all bases are equipped to monitor all values, error handling for undefined
      if (metar.temp_c !== undefined)
        temps.push(metar.temp_c[0])
      if (metar.wind_speed_kt !== undefined)
        winds.push(metar.wind_speed_kt[0]);
      if (metar.visibility_statute_mi !== undefined)
        viz.push(metar.visibility_statute_mi[0])
    })

    // Create temperature graph
    const ctxL = document.getElementById(this.props.metars[0].station_id[0] + 'temp').getContext('2d');
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

    // Create visibility graph
    const ctxL1 = document.getElementById(this.props.metars[0].station_id[0] + 'viz').getContext('2d');
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

    // Create wind speed graph
    const ctxL2 = document.getElementById(this.props.metars[0].station_id[0] + 'wind').getContext('2d');
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
    if (this.props.metars === undefined) {
      return (
        <div></div>
      )
    }
    else {
    return (
      <div className="card">
        <div className="card-header">
          <div style={{overflow: 'auto'}}>
          {this.props.metars[0].station_id[0].slice(1)}
          <Timer metar={this.props.metars[0]}/>
          </div>
        </div>
        <div className="card-body">
          <ul id="metar-pane" className="list-group">
            <li className="list-group-item active">METARs</li>
            {this.props.metars.map((metar) => {
              return (
                <li key = {metar.raw_text[0]} className="list-group-item">{metar.raw_text[0]}</li>
              )
            })}
          </ul>
          <div id="metar-pane-graphs">
            <div style={{textAlign: "center"}}>
              <h3 style={{marginTop: '1px'}}>Trends</h3>
            </div>
            <ul className="nav nav-pills">
              <li className="active"><a data-toggle="pill" href={"#" + this.props.metars[0].station_id[0] + 'tempview'}>Temp</a></li>
              <li><a data-toggle="pill" href={"#" + this.props.metars[0].station_id[0] + 'vizview'}>Visibility</a></li>
              <li><a data-toggle="pill" href={"#" + this.props.metars[0].station_id[0] + 'windview'}>Wind Speed</a></li>
            </ul>

            <div style={{top: "100px", width: "120%"}} className="tab-content">
              <div style={{width: "100%"}} id={this.props.metars[0].station_id[0] + 'tempview'} className="tab-pane fade in active">
                <div style={{marginTop: "30px", width: "100%"}}>
                  <canvas id={this.props.metars[0].station_id[0] + 'temp'}></canvas>
                </div>
              </div>
              
              <div id={this.props.metars[0].station_id[0] + 'vizview'} className="tab-pane fade">
                <div style={{marginTop: "30px", width: "100%"}}>
                  <canvas id={this.props.metars[0].station_id[0] + 'viz'}></canvas>
                </div>
              </div>
              <div id={this.props.metars[0].station_id[0] + 'windview'} className="tab-pane fade">
              <div style={{marginTop: "30px", width: "100%"}}>
                  <canvas id={this.props.metars[0].station_id[0] + 'wind'}></canvas>
                </div>
              </div>
            </div>
          </div>
          <table className="table table-bordered">
            <thead style={{background: "#ebebeb"}}>
              <tr>
                <th>TAF</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.props.taff}</td>
              </tr>
            </tbody>
          </table>
          
        </div>
        <button className="btn btn-danger" onClick={() => this.props.removePlannerItem(this.props.metars[0].station_id[0])}>Remove</button>
      </div>
    );
          }
  }
}


