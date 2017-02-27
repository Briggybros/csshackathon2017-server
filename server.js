const express = require('express');
const bodyParser = require('body-parser');
const {getAuthority, getRecyclable, createItem, getMaterials} = require('./api.js');

const app = express();

const port = 8081 || process.env.PORT;

app.use(bodyParser.json());

app.get('/getauthority', (req, res) => {
  getAuthority(req.query.latitude, req.query.longitude).then((response) => {
    res.send(JSON.stringify(response));
  }).catch((err) => {
    console.error(err);
  });
});

app.get('/recyclapple/', (req, res) => {
  getRecyclable(req.query.authority, req.query.barcode)
  .then((instructions) => {
    Promise.all(instructions).then((instructions2) => {
      res.send(JSON.stringify(instructions2));
    });
  });
});

app.get('/getmaterials', (req, res) => {
  getMaterials().then((response) => {
    res.send(JSON.stringify(response));
  }).catch((err) => {
    console.error(err);
  });
});

app.post('/recyclapple/', (req, res) => {
  createItem(JSON.parse(req.body), req.query.barcode).then((response) => {
    res.send(JSON.stringify(response));
  }).catch((err) => {
    console.error(err);
  });
});

app.listen(port, () => {
  console.log('Server started on ' + port);
});
