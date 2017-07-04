const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Apply middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Zipcode-based requests
app.post('/api/current/fahrenheit-zip', function(req, res) {
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?zip=${req.body.zip}&units=imperial&APPID=730998c6b183507939c0654d49097597`
    )
    .then(function(response) {
      res.send(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.post('/api/current/celsius-zip', function(req, res) {
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?zip=${req.body.zip}&units=metric&APPID=730998c6b183507939c0654d49097597`
    )
    .then(function(response) {
      res.send(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.post('/api/forecast/fahrenheit-zip', function(req, res) {
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/forecast/daily?zip=${req.body.zip}&units=imperial&cnt=6&APPID=730998c6b183507939c0654d49097597`
    )
    .then(function(response) {
      res.send(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.post('/api/forecast/celsius-zip', function(req, res) {
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/forecast/daily?zip=${req.body.zip}&units=metric&cnt=6&APPID=730998c6b183507939c0654d49097597`
    )
    .then(function(response) {
      res.send(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

// Geolocation-based requests
app.post('/api/current/fahrenheit', function(req, res) {
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${req.body.lat}&lon=${req.body.lon}&units=imperial&APPID=730998c6b183507939c0654d49097597`
    )
    .then(function(response) {
      res.send(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.post('/api/current/celsius', function(req, res) {
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${req.body.lat}&lon=${req.body.lon}&units=metric&APPID=730998c6b183507939c0654d49097597`
    )
    .then(function(response) {
      res.send(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.post('/api/forecast/fahrenheit', function(req, res) {
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${req.body.lat}&lon=${req.body.lon}&units=imperial&cnt=6&APPID=730998c6b183507939c0654d49097597`
    )
    .then(function(response) {
      res.send(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.post('/api/forecast/celsius', function(req, res) {
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${req.body.lat}&lon=${req.body.lon}&units=metric&cnt=6&APPID=730998c6b183507939c0654d49097597`
    )
    .then(function(response) {
      res.send(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

// Always return index.html so react-router renders the route in the client
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'public/index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
