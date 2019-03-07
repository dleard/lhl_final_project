import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const uuidv4 = require('uuid/v4');

export default class MarkerSet extends Component {

  render() {
    console.log('metar props in markerset!');
    console.log(this.props.metars);
    if (this.props.metars != null) {
      console.log('metar loaded!');
      const markers = this.props.metars.map(marker => (
        <Marker key={uuidv4()} station={marker.station_id} position={{ lat: `${marker.latitude[0]}`, lng: `${marker.longitude[0]}` }} />
      ));
      console.log(markers);
      return (
        <div>
            {markers} 
        </div>
      );
    }
    
    return (
      <div>
          
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

