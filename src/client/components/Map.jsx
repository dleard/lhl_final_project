import React, { Component } from 'react';
import '/src/client/app.css';

const styleObject = require("../styleObject.json")

export default class Map extends Component {
  constructor() {
    super(); // SUPER IMPORTANT!  IF YOU LEAVE THIS OUT, STUFF BREAKS!

    this.state = {};
    
  }

  componentDidMount() {
    function initMap(lat, long) {

      // Create a new StyledMapType object, passing it an array of styles,
      // and the name to be displayed on the map type control.
    var styledMapType = new google.maps.StyledMapType(styleObject,
      {name: 'Styled Map'});
  
      // Create a map object, and include the MapTypeId to add
      // to the map type control.
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: lat || 55.427, lng: long || -123.367},
        zoom: 5,
        mapTypeControlOptions: {
          mapTypeIds: ['satellite', 'terrain',
                  'styled_map']
        }
      });
  
      infowindow = new google.maps.InfoWindow({
        content: document.getElementById('form')
      });
  
      messagewindow = new google.maps.InfoWindow({
        content: document.getElementById('message')
      });
  
      google.maps.event.addListener(map, 'click', function(event) {
        
        marker = new google.maps.Marker({
          position: event.latLng,
          map: map
        });
  
  
        google.maps.event.addListener(marker, 'click', function() {
          $('#form').css('display', 'block');
          infowindow.open(map, marker);
        });
      });
  
      //Associate the styled map with the MapTypeId and set it to display.
      map.mapTypes.set('styled_map', styledMapType);
      map.setMapTypeId('styled_map');
  }
  const markers = [];
  function populateMarkers(markersdata){
    locationwindow = new google.maps.InfoWindow();
    let i = 0;
    for (key in markersdata) {
      markersdata[key].editPara = 'edit$' + markersdata[key].id;
      markersdata[key].deletePara = 'delete$' + markersdata[key].id + '$' + i;
      const markerData = markersdata[key];
      let location = {lat: markerData.lat, lng: markerData.long};
      const marker = new google.maps.Marker({position: location, map: map});
      marker.addListener('click', function(event) {
        locationwindow.close(); // Close previously opened infowindow
        locationwindow.setContent( `<div class='location-info'><div style='float:left'>
        <img style='width:120px' src=${markerData.imgsrc}></div><div style='float:right; padding: 10px;'>
        <p><b>${markerData.name}</b></p><br/><p>Address:<br/>${markerData.address}</p><br/>
        <p>Description:</p>
        <p>${markerData.description}<p>
        <input id='edit-btn' type='button' onclick="editLocationData('${markerData.editPara}')" value='Edit'/>
        <input id='delete-btn' type='button' onclick="editLocationData('${markerData.deletePara}')" value='Delete'/></td></div></div>`);
        locationwindow.open(map, marker);
      });
      i++;
      markers.push(marker);
    };
  }
  
  function deleteMarker(index){
    markers[index].setMap(null);
  }
  
  }
  render() {
    
    return (
      <div id='map-background' class="map-background map" >
        <div class='map' id="map"></div>
      </div>
    );
  }
}
