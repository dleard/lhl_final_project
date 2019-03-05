const express = require('express');
const os = require('os');
var parseString = require('xml2js').parseString;
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/getxml', (req,res) => {
  axios.get(`https://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&stationString=@BC&hoursBeforeNow=3`)
  .then(response => {
    parseString(response.data, function (err, result) {
      res.send(result)
    });        
  })
});


app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
