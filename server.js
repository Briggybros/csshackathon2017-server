const express = require('express');
const request = require('request');
const crypto = require('crypto');
const {Database} = require ('./database/index.js');

const app = express();
const db = new Database();

const port = 8081 || process.env.PORT;

app.get('/getauthority', (req, res) => {
  request(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${req.query.latitude},${req.query.longitude}&sensor=false`, (error, response, body) => {
    if(!error && response.statusCode == 200) {
      let result = JSON.parse(body).results[0].address_components;
      let authority = null;
      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].types.length; j++) {
          if (result[i].types[j] === 'administrative_area_level_2') {
            authority = result[i].long_name;
          }
        }
      }
      if (authority !== null) {
        res.send(JSON.stringify({
          id: crypto.createHash('MD5').update(authority).digest('hex'),
          name: authority,
        }));
      } else {
        res.send(JSON.stringify({error: 'Cannot find local authority'}));
      }
    }
  });
});

app.get('/recyclable/:barcode', (req, res) => {
  let barcode = req.params.barcode;
});

app.listen(port, () => {
  console.log('Server started on ' + port);
});
