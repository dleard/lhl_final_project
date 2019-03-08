const express = require('express');
const os = require('os');
var parseString = require('xml2js').parseString;
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/getmetars', (req,res) => {
  axios.get(`https://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&stationString=@BC&hoursBeforeNow=3`)
  .then(response => {
    parseString(response.data, function (err, result) {
      res.send(result)
    });        
  })
});

app.get(`/api/getmetars/:province`, (req, res) => {
  let prefix = "@";
  let numMetars = "3";
  if (req.params.province === 'CA') {
    prefix = "~";
    numMetars = 1;
  }

  axios.get(`https://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&stationString=${prefix}${req.params.province}&hoursBeforeNow=${numMetars}`)
  .then(response => {
    parseString(response.data, function (err, result) {
      res.send(result)
    });        
  })
})

app.get('/api/gettaffs', (req,res) => {
  axios.get(`https://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=tafs&requestType=retrieve&format=xml&stationString=@BC&hoursBeforeNow=1  `)
  .then(response => {
    parseString(response.data, function (err, result) {
      res.send(result)
    });        
  })
});

app.get('/api/gettaffs:province', (req,res) => {
  let prefix = "@";
  if (req.params.province === 'CA') {
    prefix = "~";
  }
  axios.get(`https://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=tafs&requestType=retrieve&format=xml&stationString=${prefix}${req.params.province}&hoursBeforeNow=1  `)
  .then(response => {
    parseString(response.data, function (err, result) {
      res.send(result)
    });        
  })
});


app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
