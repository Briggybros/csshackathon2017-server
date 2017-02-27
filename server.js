const express = require('express');
const {getAuthority, getRecyclable} = require('./api.js');

const app = express();

const port = 8081 || process.env.PORT;

app.get('/getauthority', (req, res) => {
  Promise.resolve(getAuthority(req.query.latitude, req.query.longitude))
  .then((response) => {
    res.send(JSON.stringify(response));
  });
});

app.get('/recyclable/:authority/:barcode', (req, res) => {
  Promise.resolve(getRecyclable(req.params.authority, req.params.barcode))
  .then((response) => {
    res.send(JSON.stringify(response));
  });
});

app.listen(port, () => {
  console.log('Server started on ' + port);
});
