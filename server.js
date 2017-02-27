const express = require('express');
const bodyParser = require('body-parser');
const {getAuthority, getRecyclable, createItem, getMaterials} = require('./api.js');

const app = express();

const port = 8081 || process.env.PORT;

app.use(bodyParser.json());

app.get('/getauthority', (req, res) => {
  getAuthority(req.query.latitude, req.query.longitude).then((response) => {
    res.send(JSON.stringify(response));
  });
});

app.get('/recyclapple/:authority/:barcode', (req, res) => {
  getRecyclable(req.params.authority, req.params.barcode).then((response) => {
    res.send(JSON.stringify(response));
  });
});

app.get('/getmaterials', (req, res) => {
  getMaterials().then((response) => {
    res.send(JSON.stringify(response));
  });
});

app.post('/recyclapple/:authority/:barcode', (req, res) => {
  createItem(JSON.parse(req.body)).then((response) => {
    res.send(JSON.stringify(response));
  });
});

app.listen(port, () => {
  console.log('Server started on ' + port);
});
