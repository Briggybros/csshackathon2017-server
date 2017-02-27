const express = require('express');
const {getAuthority, getRecyclable} = require('./api.js');

const app = express();

const port = 8081 || process.env.PORT;

app.get('/getauthority', (req, res) => {
  getAuthority(req.query.latitude, req.query.longitude);
});

app.get('/recyclable/:authority/:barcode', (req, res) => {
  getRecyclable(req.params.authority, req.params.barcode);
});

app.listen(port, () => {
  console.log('Server started on ' + port);
});
