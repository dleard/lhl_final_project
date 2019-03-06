import React, { Component } from 'react';
import { ETIME } from 'constants';

export default class Dashboard extends Component {

  state = {
    selected_province: null,
    location: null
  }

  selectProvince = (e) => {
    e.persist();
    e.preventDefault;
    this.setState({selected_province: e.target.name});
  }

  setStartLocation = (e) => {
    this.setState({location: event.target.value});
  }

  render() {
    const showHideClassName = this.props.show ? "dashboard display-block" : "dashboard display-none";
    const st = this.state
    return (
      <div className={showHideClassName}>
        <section className="dashboard-main">
          <div>
          <form id="config" onSubmit={(e) => this.props.handleConfigSubmit(e,st)}>
            <table className="table table-bordered">
              <thead style={{background: "#ebebeb"}}>
                <tr>
                  <th>Select Province</th>
                </tr>
              </thead>
              <tbody className="input-group" onChange={this.selectProvince} onClick={this.unCheck} >
                <tr>
                  <td>
                    <label className="radio-inline"><input type="radio" name="BC"/>BC</label>
                    <label className="radio-inline"><input type="radio" name="AB"/>AB</label>
                    <label className="radio-inline"><input type="radio" name="SK"/>SK</label>
                    <label className="radio-inline"><input type="radio" name="MB"/>MB</label>
                    <label className="radio-inline"><input type="radio" name="ON"/>ON</label>
                    <label className="radio-inline"><input type="radio" name="QC"/>QC</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="radio-inline"><input type="radio" name="CA"/>All Canada</label>
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="table table-bordered">
              <thead style={{background: "#ebebeb"}}>
                <tr>
                  <th>Starting Location</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="text" placeholder="CYYJ"  onChange={this.setStartLocation}/>
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="btn btn-danger" onClick={this.props.handleClose}>close</button>
            <button className="btn btn-success" onClick={() => this.props.handleConfigSubmit(st)} style={{float: "right"}} type="button">Save Config</button>
          </form>
          </div>
        </section>
      </div>
    );
  }
}