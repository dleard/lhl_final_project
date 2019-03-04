const express = require('express');
const os = require('os');
var parseString = require('xml2js').parseString;
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.get('/api/getList', (req,res) => {
  axios.get(`https://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&stationString=@BC&hoursBeforeNow=3`)
  .then(response => {
    console.log(response)
    parseString(response.data, function (err, result) {
      // console.log(result); // returns a json array
      res.send(result)
    });        
  })
  // var list = ["item1", "item2", "item3"];
  // res.send({list: list});
  // console.log('Sent list of items');
});

app.get('/api/getxml', (req,res) => {
  var list = ["item1", "item2", "item3"];
  res.send({list: list});
  console.log('Sent ANOTHER LIST');
  // axios.get(`https://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&stationString=@BC&hoursBeforeNow=3`)
  // .then(response => {
  //   console.log(response)
  //   parseString(response.data, function (err, result) {
  //     console.log(result); // returns a json array
  //     res.send(result)
  //   });        
  // })
});


app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
