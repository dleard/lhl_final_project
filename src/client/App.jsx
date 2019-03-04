import React, { Component } from 'react';
import ReactImage from './react.png';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';

export default class App extends Component {
  state = {
    username: null,
    isPaneOpenLeft: true
  };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ isPaneOpenLeft: true })}>Click me to open right pane!</button>
        <SlidingPane
                closeIcon={<div>Some div containing custom close icon.</div>}
                isOpen={ this.state.isPaneOpenLeft }
                title='Hey, it is optional pane title.  I can be React component too.'
                from='left'
                width='50%'
                onRequestClose={ () => this.setState({ isPaneOpenLeft: false }) }>
                <div>And I am pane content on left.</div>
            </SlidingPane>
        <img style={{width: "100vw", height: "100vh"}} src={ReactImage} alt="react" />
      </div>
    );
  }
}
