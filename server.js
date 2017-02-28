const express = require('express');
const bodyParser = require('body-parser');
const {getAuthority, getRecyclable, createItem, getMaterials, createInstruction} = require('./api.js');

const app = express();

const port = process.env.PORT || 8081;

app.use(bodyParser.json());

app.get('/getauthority', (req, res) => {
  if (req.query.latitude !== undefined && req.query.longitude !== undefined) {
    getAuthority(req.query.latitude, req.query.longitude).then((response) => {
      res.send(JSON.stringify(response));
    }).catch((err) => {
      console.error(err);
    });
  } else {
    res.send(JSON.stringify({
      results: {
        id: '',
        name: '',
      },
      error: 'no location data provided',
    }));
  }
});

app.get('/recyclapple', (req, res) => {
  if (req.query.barcode !== undefined) {
    if (req.query.authority !== undefined) {
      getRecyclable(req.query.authority, req.query.barcode).then((response) => {
        res.send(JSON.stringify(response));
      }).catch((err) => {
        console.error(err);
      });
    } else if (req.query.latitude !== undefined && req.query.longitude !== undefined) {
      getAuthority(req.query.latitude, req.query.longitude).then((response) => {
        getRecyclable(response.results.id, req.query.barcode).then((response) => {
          res.send(JSON.stringify(response));
        }).catch((err) => {
          console.error(err);
        });
      }).catch((err) => {
        console.error(err);
      });
    } else {
      res.send({
        results: [],
        error: 'no location data provided',
      });
    }
  } else {
    res.send({
      results: [],
      error: 'no barcode provided',
    });
  }
});

app.get('/getmaterials', (req, res) => {
  getMaterials().then((response) => {
    res.send(JSON.stringify(response));
  }).catch((err) => {
    console.error(err);
  });
});

app.post('/recyclapple', (req, res) => {
  console.log(req.body);
  if (req.query.barcode !== undefined) {
    createItem(req.body.components, req.query.barcode).then((response) => {
      res.send(JSON.stringify(response));
    }).catch((err) => {
      console.error(err);
    });
  } else {
    res.send({
      results: [],
      error: 'barcode not provided',
    });
  }
});

app.post('/createinstruction', (req, res) => {
  if (req.query.authority !== undefined) {
    createInstruction(req.body, req.query.authority).then((response) => {
      res.send(JSON.stringify(response));
    }).catch((err) => {
      console.error(err);
    });
  } else if (req.query.latitude !== undefined && req.query.longitude !== undefined) {
    getAuthority(req.query.latitude, req.query.longitude).then((response) => {
      createInstruction(req.body.components, response.id).then((response) => {
        res.send(JSON.stringify(response));
      }).catch((err) => {
        console.error(err);
      });
    });
  } else {
    res.send({
      results: {
        instruction: '',
        authId: '',
        materialId: 0,
      },
      error: 'no location data provided',
    });
  }
});

app.listen(port, () => {
  console.log('Server started on ' + port);
});
