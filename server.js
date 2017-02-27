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

app.get('/recyclapple/:authority/:barcode', (req, res) => {
  getRecyclable(req.params.authority, req.params.barcode)
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

app.post('/recyclapple/:authority/:barcode', (req, res) => {
  createItem(JSON.parse(req.body)).then((response) => {
    res.send(JSON.stringify(response));
  }).catch((err) => {
    console.error(err);
  });
});

app.listen(port, () => {
  console.log('Server started on ' + port);
});
