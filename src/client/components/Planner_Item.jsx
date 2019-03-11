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
      if (metar.temp_c !== undefined)
        temps.push(metar.temp_c[0])
      if (metar.wind_speed_kt !== undefined)
        winds.push(metar.wind_speed_kt[0]);
      if (metar.visibility_statute_mi !== undefined)
        viz.push(metar.visibility_statute_mi[0])
    })

    /** THIS NEEDS REFACTORIING! */

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
            <div style={{textAlign: "center"}}>
              <h3 style={{marginTop: '0'}}>Trends</h3>
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
                <th>TAFF</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.props.taff}</td>
              </tr>
            </tbody>
          </table>
          
        </div>
      </div>
    );
  }
}


