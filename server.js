const express = require('express');
const request = require('request');

const app = express();

const port = 8081 || process.env.PORT;

app.get('/getauthority', (req, res) => {
  request(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${req.query.latitude},${req.query.longitude}&sensor=false`, (error, response, body) => {
    if(!error && response.statusCode == 200) {
      let result = JSON.parse(body).results[0].address_components;
      let response = '';
      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].types.length; j++) {
          if (result[i].types[j] === 'administrative_area_level_2') {
            response = result[i].long_name;
          }
        }
      }
      res.send(response);
    }
  });
});

app.listen(port, () => {
  console.log('Server started on ' + port);
});
