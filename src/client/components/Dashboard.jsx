import React, { Component } from 'react';

export default class Dashboard extends Component {
  render() {
    const showHideClassName = this.props.show ? "dashboard display-block" : "dashboard display-none";

    return (
      <div className={showHideClassName}>
        <section className="dashboard-main">
          <div>
          <form id="base-search" onSubmit={this.handleSubmit}>
            <table className="table table-bordered">
              <thead style={{background: "#ebebeb"}}>
                <tr>
                  <th>Select Province</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <label className="radio-inline"><input type="radio" name="optradio" checked/>BC</label>
                    <label className="radio-inline"><input type="radio" name="optradio"/>AB</label>
                    <label className="radio-inline"><input type="radio" name="optradio"/>SK</label>
                    <label className="radio-inline"><input type="radio" name="optradio"/>MB</label>
                    <label className="radio-inline"><input type="radio" name="optradio"/>ON</label>
                    <label className="radio-inline"><input type="radio" name="optradio"/>QC</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="radio-inline"><input type="radio" name="optradio"/>All Canada</label>
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
                    <input type="text" placeholder="CYYJ"  />
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="btn btn-danger" onClick={this.props.handleClose}>close</button>
            <button className="btn btn-success" style={{float: "right"}} type="submit">Save Config</button>
          </form>
    
          </div>
        </section>
      </div>
    );
  }
}