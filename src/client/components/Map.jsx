import React, { Component } from 'react';
import '/src/client/app.css';
import ReactImage from './react.png';

export default class Map extends Component {
  constructor() {
    super(); // SUPER IMPORTANT!  IF YOU LEAVE THIS OUT, STUFF BREAKS!

    this.state = {};
    
  }

  componentDidMount() {
    function initMap(lat, long) {

      // Create a new StyledMapType object, passing it an array of styles,
      // and the name to be displayed on the map type control.
    var styledMapType = new google.maps.StyledMapType([
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8ec3b9"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1a3646"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#64779e"
            }
          ]
        },
        {
          "featureType": "administrative.neighborhood",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#4b6878"
            }
          ]
        },
        {
          "featureType": "landscape.man_made",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#334e87"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#97b3d0"
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#283d6a"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#6f9ba5"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#023e58"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#3C7680"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#304a7d"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#98a5be"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#2c6675"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#255763"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#b0d5ce"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#023e58"
            }
          ]
        },
        {
          "featureType": "road.local",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#98a5be"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#283d6a"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#3a4762"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#32586e"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#4e6d70"
            }
          ]
        }
      ],
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
