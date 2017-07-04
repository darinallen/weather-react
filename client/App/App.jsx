import React, { Component } from 'react';
import axios from 'axios';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Radio from 'react-bootstrap/lib/Radio';
import Header from '../Header/Header';
import Welcome from '../Welcome/Welcome';
import Current from '../Current/Current';
import Forecast from '../Forecast/Forecast';
import Search from '../Search/Search';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFahrenheitData: { main: { temp: '' }, weather: [{ icon: '01d' }] },
      currentCelsiusData: { main: { temp: '' }, weather: [{ icon: '01d' }] },
      currentSelectedData: { main: { temp: '' }, weather: [{ icon: '01d' }] },
      forecastFahrenheitData: { list: [] },
      forecastCelsiusData: { list: [] },
      forecastSelectedData: { list: [] },
      location: {},
      selectedRadioButton: 'fahrenheit',
      zip: ''
    };
  }

  // Get location data and weather data
  getWeatherByZip = e => {
    e.preventDefault();
    this.getCurrentFahrenheitByZip();
    this.getCurrentCelsiusByZip();
    this.getForecastFahrenheitByZip();
    this.getForecastCelsiusByZip();
  };

  // Get the current weather from OpenWeatherMap based on zip code
  getCurrentFahrenheitByZip = () => {
    axios.post('api/current/fahrenheit-zip', { zip: this.state.zip }).then(res => {
      this.setState({ currentFahrenheitData: res.data });
      this.setState({ currentSelectedData: res.data });
    });
  };

  getCurrentCelsiusByZip = () => {
    axios.post('api/current/celsius-zip', { zip: this.state.zip }).then(res => {
      this.setState({ currentCelsiusData: res.data });
    });
  };

  // Get the current forecast from OpenWeatherMap based on location data
  getForecastFahrenheitByZip = () => {
    axios.post('api/forecast/fahrenheit-zip', { zip: this.state.zip }).then(res => {
      this.setState({ forecastFahrenheitData: res.data });
      this.setState({ forecastSelectedData: res.data });
    });
  };

  getForecastCelsiusByZip = () => {
    axios.post('api/forecast/celsius-zip', { zip: this.state.zip }).then(res => {
      this.setState({ forecastCelsiusData: res.data });
    });
  };

  // Get location data and weather data
  getWeatherByGeo = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        location: {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        }
      });
      this.getCurrentFahrenheitByGeo();
      this.getCurrentCelsiusByGeo();
      this.getForecastFahrenheitByGeo();
      this.getForecastCelsiusByGeo();
    });
  };

  // Get the current weather from OpenWeatherMap based on location data
  getCurrentFahrenheitByGeo = () => {
    axios
      .post('api/current/fahrenheit', { lon: this.state.location.longitude, lat: this.state.location.latitude })
      .then(res => {
        this.setState({ currentFahrenheitData: res.data });
        this.setState({ currentSelectedData: res.data });
      });
  };

  getCurrentCelsiusByGeo = () => {
    axios
      .post('api/current/celsius', { lon: this.state.location.longitude, lat: this.state.location.latitude })
      .then(res => {
        this.setState({ currentCelsiusData: res.data });
      });
  };

  // Get the current forecast from OpenWeatherMap based on location data
  getForecastFahrenheitByGeo = () => {
    axios
      .post('api/forecast/fahrenheit', { lon: this.state.location.longitude, lat: this.state.location.latitude })
      .then(res => {
        this.setState({ forecastFahrenheitData: res.data });
        this.setState({ forecastSelectedData: res.data });
      });
  };

  getForecastCelsiusByGeo = () => {
    axios
      .post('api/forecast/celsius', { lon: this.state.location.longitude, lat: this.state.location.latitude })
      .then(res => {
        this.setState({ forecastCelsiusData: res.data });
      });
  };

  handleZipEntry = e => {
    e.preventDefault();
    this.setState({ zip: e.target.value });
  };

  handleRadioSelect = e => {
    this.setState({ selectedRadioButton: e.currentTarget.value }, () => {
      if (this.state.selectedRadioButton === 'fahrenheit') {
        this.setState({
          currentSelectedData: this.state.currentFahrenheitData,
          forecastSelectedData: this.state.forecastFahrenheitData
        });
      } else {
        this.setState({
          currentSelectedData: this.state.currentCelsiusData,
          forecastSelectedData: this.state.forecastCelsiusData
        });
      }
    });
  };

  render() {
    return (
      <div className="app">
        <Header />
        <img className="img-responsive home-image" src="https://image.ibb.co/ky2r0F/weather.png" alt="nice weather" />
        <Welcome />
        <Search
          getWeatherByGeo={this.getWeatherByGeo}
          getWeatherByZip={this.getWeatherByZip}
          handleZipEntry={this.handleZipEntry}
          zip={this.state.zip}
        />
        {/* Only display weather content if weather data exists */}
        {this.state.currentSelectedData.main.temp !== ''
          ? <div>
              <Current currentData={this.state.currentSelectedData} location={this.state.location} />
              <FormGroup className="radio-buttons">
                <Radio
                  checked={this.state.selectedRadioButton === 'fahrenheit'}
                  name="radioGroup"
                  value="fahrenheit"
                  onChange={this.handleRadioSelect}
                  inline
                >
                  Fahrenheit
                </Radio>
                {' '}
                <Radio
                  checked={this.state.selectedRadioButton === 'celsius'}
                  name="radioGroup"
                  value="celsius"
                  onChange={this.handleRadioSelect}
                  inline
                >
                  Celsius
                </Radio>
                {' '}
              </FormGroup>
              <Forecast forecastData={this.state.forecastSelectedData} location={this.state.location} />
            </div>
          : false}
      </div>
    );
  }
}

export default App;
