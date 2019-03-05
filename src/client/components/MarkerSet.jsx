import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export default class MarkerSet extends Component {

  render() {
    console.log('metar props in markerset!');
    console.log(this.props.metars);
    // const markers = this.props.metars.map(marker => (
    //   <Marker key={Date.now()} station={marker.station_id} lat={marker.lat} />
    // ));
    return (
      <div>
          {/* {markers}  */}
      </div>
    );
  }
}


/*<Marker
position={{ lat: -34.397, lng: 150.644 }}
onClick={props.onToggleOpen}
>*/

// class MessageList extends Component {
//   render() {
//     const messageListItems = this.props.messages.map(message => (
//       <Message key={message.id} username={message.username} content={message.content} type={message.type} />
//     ));
//     return (
//       <main className="messages">
        
//         {messageListItems}
//       </main>
//     );
//   }
// }
// export default MessageList;

