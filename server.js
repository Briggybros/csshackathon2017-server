const express = require('express');
const bodyParser = require('body-parser');
const {getAuthority, getRecyclable, createItem, getMaterials} = require('./api.js');

const app = express();

const port = process.env.PORT || 8081;

app.use(bodyParser.json());

app.get('/getauthority', (req, res) => {
  getAuthority(req.query.latitude, req.query.longitude).then((response) => {
    res.send(JSON.stringify({results: response}));
  }).catch((err) => {
    console.error(err);
  });
});

app.get('/recyclapple', (req, res) => {
  if (req.query.authority !== undefined) {
    getRecyclable(req.query.authority, req.query.barcode).then((response) => {
      res.send(JSON.stringify({results: response}));
    }).catch((err) => {
      console.error(err);
    });
  } else if (req.query.latitude !== undefined && req.query.longitude !== undefined) {
    getAuthority(req.query.latitude, req.query.longitude).then((response) => {
      getRecyclable(response.id, req.query.barcode).then((response) => {
        res.send(JSON.stringify({results: response}));
      }).catch((err) => {
        console.error(err);
      });
    }).catch((err) => {
      console.error(err);
    });
  }
});

app.get('/getmaterials', (req, res) => {
  getMaterials().then((response) => {
    res.send(JSON.stringify({results: response}));
  }).catch((err) => {
    console.error(err);
  });
});

app.post('/recyclapple', (req, res) => {
  createItem(req.body, req.query.barcode).then((response) => {
    res.send(JSON.stringify({results: response}));
  }).catch((err) => {
    console.error(err);
  });
});

app.listen(port, () => {
  console.log('Server started on ' + port);
});
