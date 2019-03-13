# Co-Pilot Flight Data App

Co-Pilot is a flight data app tailored towards pilots and air safety personnel.

It requests information via API calls about individual airports in the form of Metars, 
TAFs and NOTAMS and displays this information in a convenient and easy to read interface.

This app was created by Nick Doyle and Dylan Leard.

## Screenshots
!["Screenshot of a Populated Map: "](https://github.com/dleard/lhl_final_project/blob/master/screenshots/BCMap.png)
!["Screenshot of Trip Planner Pane: "](https://github.com/dleard/lhl_final_project/blob/master/screenshots/Planner.png)
!["Screenshot of Config Panel: "](https://github.com/dleard/lhl_final_project/blob/master/screenshots/Config.png)

## Core Dependencies

- Node.js
- Express
- React
- bootstrap
- chartjs
- dotenv-webpack
- google-maps-react
- node-sass
- uuid
- xml2js

## Getting Started

- A GoogleMaps API key is required for the map to properly render

- Install all dependencies (using the `npm install` command)
- Run `npm run dev` to start the development server

## Using the app

- The displayed province defaults to BC
- The selected province can be changed using the Config panel
- Clicking on an airport marker shows information for that airport,
and contains a button to add that airport to your trip planner
- The trip planner can be opened with the planner button at the top
of the page
- Inside the planner airports can be added via the search bar, and removed
with the remove button
- The planner displays Metars, TAFs, and trend graphs for temperature, wind speed
and visibility